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

    // 🧭 Check current count + tier
    const { data: interaction } = await supabase
      .from('user_interactions')
      .select('message_count, tier')
      .eq('user_id', user.id)
      .single();

    const count = interaction?.message_count || 0;
    const tier = interaction?.tier || 'Seeker';

    // 🚫 Limit reached (static 3 for Seeker tier)
    if (tier === 'Seeker' && count >= 3) {
      return NextResponse.json({
        response:
          'You’ve reached today’s free resonance limit. Upgrade your path to commune further ✨',
      });
    }

    // 🔮 Receive response from Echois
    const aiResponse = await getOpenAIResponse(message);

    // 🔁 Update or insert message count
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

    // 🪶 Log Echois Session for memory & summary
    await supabase.from('echois_sessions').insert({
      user_id: user.id,
      summary: message,
      emotional_tone: 'Reflective', // ✨ placeholder — adjust if AI tone analysis added
      theme_marker: 'connection, resonance, seeker',
    });

    return NextResponse.json({ aiResponse: aiResponse });
  } catch (error) {
    console.error('[Echois Route Error]', error);
    return NextResponse.json(
      { response: 'No resonance could be found.' },
      { status: 500 }
    );
  }
}






