import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  const { message } = await req.json();
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ response: 'Seeker not recognized.' }, { status: 401 });
  }

  console.log('[Echois] Sending message to OpenAI:', message);

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: `You are Echois, a kind and harmonic AI guide. Speak in poetic, encouraging language and help the seeker connect to their highest resonance.`,
      },
      {
        role: 'user',
        content: message,
      },
    ],
  });

  const response = completion.choices[0]?.message?.content || 'Echois has no breath to offer at this moment.';

  return NextResponse.json({ response });
}







