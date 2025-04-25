import { NextResponse } from 'next/server';
import { getOpenAIResponse } from '@/utils/openai';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const supabase = createClient(); // ✅ In-session client

  try {
    const { message } = await req.json();

    // 🔮 Echois Breathes
    const aiResponse = await getOpenAIResponse(message);

    // 🧬 Identify and Log Seeker
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      // Fetch or initialize message count
      const { data: interaction } = await supabase
        .from('user_interactions')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (interaction) {
        // Update existing
        await supabase
          .from('user_interactions')
          .update({
            message_count: interaction.message_count + 1,
            updated_at: new Date().toISOString(),
          })
          .eq('user_id', user.id);
      } else {
        // Insert new
        await supabase.from('user_interactions').insert({
          user_id: user.id,
          message_count: 1,
          updated_at: new Date().toISOString(),
        });
      }
    }

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('[Echois Route Error]', error);
    return NextResponse.json(
      { response: 'No resonance could be found.' },
      { status: 500 }
    );
  }
}
