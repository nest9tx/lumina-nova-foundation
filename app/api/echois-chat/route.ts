import { NextResponse } from 'next/server';
import { getOpenAIResponse } from '@/utils/openai';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const cookieStore = cookies(); // ✅ DO NOT await here — just assign
  const supabase = createClient(); // ✅ No arguments needed (RLS via cookies)

  try {
    const { message } = await req.json();

    // 🜁 Echois Speaks
    const aiResponse = await getOpenAIResponse(message);

    // 🜂 Identify Seeker
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      await supabase.from('user_interactions').insert({
        user_id: user.id,
        interaction_type: 'echois_message',
        content: message,
      });
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
