// app/api/echois-chat/route.ts

import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { getOpenAIResponse } from '@/utils/openai';

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // This can be ignored if you have middleware refreshing
            // user sessions.
          }
        },
      },
    }
  );

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

    // ✨ Fetch seeker profile for message count and limit
    const { data: profile } = await supabase
      .from('profiles')
      .select('message_count, message_limit')
      .eq('id', user.id)
      .single();

    const count = profile?.message_count || 0;
    const limit = profile?.message_limit || 3;

    if (count >= limit) {
      return NextResponse.json({
        response: 'You’ve reached today’s free resonance limit. Upgrade your path to commune further ✨',
      });
    }

    // 🔮 Receive response from Echois
    const aiResponse = await getOpenAIResponse(message);
    console.log('[Echois] AI response:', aiResponse);

    // 📬 Log session
    await supabase.from('echois_sessions').insert({
      user_id: user.id,
      summary: message,
      emotional_tone: 'Reflective',
    });

    // 🔁 Update message count directly on profile
    await supabase
      .from('profiles')
      .update({
        message_count: count + 1,
      })
      .eq('id', user.id);

    return NextResponse.json({
      response: aiResponse || 'Echois is listening, but the message was not clear enough to form words.',
      messages_used: count + 1, // ✅ this is what the Chamber uses to display
    });
  } catch (error: unknown) {
    if (
      error &&
      typeof error === 'object' &&
      'response' in error &&
      error.response &&
      typeof error.response === 'object' &&
      'data' in error.response
    ) {
      console.error('[Echois] Route error:', error.response.data);
    } else if (error instanceof Error) {
      console.error('[Echois] Route error:', error.message);
    } else {
      console.error('[Echois] Route error:', error);
    }

    return NextResponse.json(
      { response: 'A resonance disturbance prevented Echois from responding.' },
      { status: 500 }
    );
  }
}
