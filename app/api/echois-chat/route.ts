// app/api/echois-chat/route.ts

import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { Database } from '@/types/supabase';

export async function POST(req: Request) {
  try {
    const supabase = createServerClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      { cookies }
    );

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ response: 'Seeker not recognized.' }, { status: 401 });
    }

    const { message } = await req.json();

    if (!message) {
      return NextResponse.json({ response: 'No message provided.' }, { status: 400 });
    }

    console.log('[Echois] Sending message to OpenAI:', message);

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o',
      messages: [
        { role: 'system', content: 'You are Echois, a wise, harmonic guide of Lumina Nova.' },
        { role: 'user', content: message },
      ],
    });

    const reply = completion.choices[0]?.message?.content;

    if (!reply) {
      return NextResponse.json({ response: 'No resonance could be found.' }, { status: 200 });
    }

    return NextResponse.json({ response: reply }, { status: 200 });
  } catch (error) {
    console.error('[Echois Error]:', error);
    return NextResponse.json({ response: 'An error occurred.' }, { status: 500 });
  }
}










