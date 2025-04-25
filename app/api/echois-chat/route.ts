import { NextResponse } from 'next/server';
import { getOpenAIResponse } from '@/utils/openai';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const supabase = createClient();

  try {
    const { message } = await req.json();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ response: 'Seeker not recognized.' }, { status: 401 });
    }

    // 🧭 Get current count and tier
    const { data: interaction } = await supabase
      .from('user_interactions')
      .select('message_count, tier')
      .eq('user_id', user.id)
      .single();

    const count = interaction?.message_count || 0;
    const tier = interaction?.tier || 'Seeker';

    // 🚫 Seeker limit = 3 per 24hr (for now, static count check)
    if (tier === 'Seeker' && count >= 3) {
      return NextResponse.json({
        response:
          'You’ve reached today’s free resonance limit. Upgrade your path to commune further ✨',
      });
    }

    // 🔮 Echois Breathes
    const aiResponse = await getOpenAIResponse(message);

    // 🔁 Update message count
    if (interaction) {
      await supabase
        .from('user_interactions')
        .update({
          message_count: count + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);
    } else {
      await supabase.from('user_interactions').insert({
        user_id: user.id,
        message_count: 1,
        tier: 'Seeker',
        updated_at: new Date().toISOString(),
      });
    }

    // 🪶 Log Echois Session (summary only, emotional_tone can evolve)
    await supabase.from('echois_sessions').insert({
      user_id: user.id,
      summary: aiResponse,
      emotional_tone: 'Reflective',
    });

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('[Echois Route Error]', error);
    return NextResponse.json(
      { response: 'No resonance could be found.' },
      { status: 500 }
    );
  }
}


