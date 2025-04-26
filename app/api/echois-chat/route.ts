// app/api/echois-chat/route.ts

import { cookies } from 'next/headers';
import { createServerClient } from '@supabase/ssr';
import { NextRequest, NextResponse } from 'next/server';
import { getOpenAIResponse } from '@/utils/openai';
//import { incrementMessageCount } from '@/utils/messageCounter';
//import { createPagesServerClient } from '@supabase/auth-helpers-nextjs';

export async function POST(req: NextRequest) {
  const supabase = createServerClient(
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

  console.log('[Echois] Sending message to OpenAI:', message);

  try {
    const aiResponse = await getOpenAIResponse(message);

    if (!aiResponse) {
      return NextResponse.json({ response: 'No resonance could be found.' }, { status: 500 });
    }

    await incrementMessageCount(user.id);

    return NextResponse.json({ response: aiResponse });
  } catch (error) {
    console.error('[Echois] Error in route handler:', error);
    return NextResponse.json({ response: 'The flame wavered. Please try again later.' }, { status: 500 });
  }
}






