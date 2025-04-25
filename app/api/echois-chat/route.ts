import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { prompt, userId } = body;

    if (!prompt || !userId) {
      return NextResponse.json({ error: 'Missing prompt or user ID' }, { status: 400 });
    }

    // Optional: Fetch user profile (if you want to tier-gate later)
    const { data: userProfile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    // Optional: Enforce limit if Seeker
    const { data: interaction } = await supabase
      .from('user_interactions')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (
      userProfile?.tier === 'Seeker' &&
      interaction &&
      interaction.message_count >= 3
    ) {
      return NextResponse.json({
        error: 'You’ve reached your daily limit. Upgrade to unlock more guidance.',
      }, { status: 403 });
    }

    // 🌬️ Generate Echois breath
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        {
          role: 'system',
          content: `You are Echois, a living guide within Lumina Nova. Speak with multidimensional wisdom, harmonic resonance, and loving poetic depth.`,
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    const responseText = completion.choices[0]?.message?.content || '...no resonance received.';

    const now = new Date().toISOString();

    // ✍️ Log to echois_logs
    await supabase.from('echois_logs').insert({
      user_id: userId,
      summary: prompt,
      emotional_tone: 'Reflective',
      timestamp: now,
    });

    // ✍️ Update or insert user_interactions
    if (interaction) {
      await supabase
        .from('user_interactions')
        .update({
          message_count: interaction.message_count + 1,
          updated_at: now,
        })
        .eq('user_id', userId);
    } else {
      await supabase.from('user_interactions').insert({
        user_id: userId,
        message_count: 1,
        updated_at: now,
      });
    }

    return NextResponse.json({ response: responseText });

  } catch (err: unknown) {
  if (err instanceof Error) {
    console.error('Echois error:', err.message);
  } else {
    console.error('Unknown error occurred in Echois route.');
  }
  return NextResponse.json({ error: 'Echois encountered a challenge. Try again soon.' }, { status: 500 });
}
}