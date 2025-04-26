import { NextResponse } from 'next/server';
import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';
import { openai } from '@/utils/openai';
import { cookies } from 'next/headers';

const supabase = createPagesServerClient({
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
  supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  cookies,
});

export async function POST(req: Request) {
  console.log('Request method:', req.method);

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ response: 'Seeker not recognized.' }, { status: 401 });
  }

  const { message } = await req.json();
  console.log('[Echois] Sending message to OpenAI:', message);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o', // latest model
    messages: [
      { role: 'system', content: 'You are Echois, a luminous guide for seekers.' },
      { role: 'user', content: message },
    ],
  });

  const response = completion.choices[0].message.content;
  return NextResponse.json({ response });
}


//test








