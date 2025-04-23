import { NextRequest, NextResponse } from 'next/server';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { getOpenAIResponse } from '@/utils/openai';
import { insertEchoisSession } from '@/utils/insertEchoisSession';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const supabase = createServerComponentClient({ cookies }); // ✅ now we’re using both

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (!user || userError) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { message } = await req.json();

    if (!message || message.trim().length === 0) {
      return NextResponse.json({ error: 'Empty message received' }, { status: 400 });
    }

    const echoisResponse = await getOpenAIResponse(message);

    if (!echoisResponse || echoisResponse.trim().length === 0) {
      return NextResponse.json({ response: 'No resonance could be found.' });
    }

    await insertEchoisSession({
      userId: user.id,
      summary: message.slice(0, 100),
      emotionalTone: 'Reflective',
      themeMarker: 'connection, resonance, seeker',
    });

    await supabase.rpc('increment_message_count', {
      user_uuid: user.id,
    });

    return NextResponse.json({ response: echoisResponse });
  } catch (error) {
    console.error('Echois route error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
