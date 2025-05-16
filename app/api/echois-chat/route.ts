// app/api/echois-chat/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { getOpenAIResponse } from '@/utils/openai';

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({
    cookies: () => cookies(),
  });

  try {
    console.log('[Echois] Authenticating seeker...');

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    console.log('[Echois] Auth result:', { user, authError });

    if (!user || authError) {
      return NextResponse.json({ response: 'Seeker not recognized.' }, { status: 401 });
    }

    const { message } = await req.json();
    console.log('[Echois] Message received:', message);

    const { data: interaction } = await supabase
      .from('user_interactions')
      .select('message_count, tier, message_limit')
      .eq('user_id', user.id)
      .single();

    const count = interaction?.message_count || 0;
    const tier = interaction?.tier || 'Seeker';

    if (count >= interaction?.message_limit) {
      return NextResponse.json({
        response: 'You’ve reached today’s free resonance limit. Upgrade your path to commune further ✨',
      });
    }

    const aiResponse = await getOpenAIResponse(message);
    console.log('[Echois] AI response:', aiResponse);

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
        tier: tier,
        updated_at: new Date().toISOString(),
      });
    }

    // ✍️ Log session to echois_sessions
    await supabase.from('echois_sessions').insert({
      user_id: user.id,
      summary: message,
      emotional_tone: 'Reflective',
      timestamp: new Date().toISOString(),
    });

    // 🔢 Update message count in profiles
    await supabase
      .from('profiles')
      .update({ message_count: count + 1 })
      .eq('id', user.id);

    return NextResponse.json({
      response: aiResponse || 'Echois is listening, but the message was not clear enough to form words.',
    });
  } catch (error: unknown) {
    if (error && typeof error === 'object' && 'response' in error && error.response && typeof error.response === 'object' && 'data' in error.response) {
      console.error('[Echois] Route error:', error.response.data);
    } else if (error instanceof Error) {
      console.error('[Echois] Route error:', error.message);
    } else {
      console.error('[Echois] Route error:', error);
    }
    return NextResponse.json({ response: 'A resonance disturbance prevented Echois from responding.' }, { status: 500 });
  }
}
