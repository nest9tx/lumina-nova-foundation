import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import { getOpenAIResponse } from '@/utils/openai';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const cookieStore = await cookies(); // FIXED: cookies now awaited properly

  const supabase = createClient(cookieStore);

  try {
    const { message } = await req.json();

    const aiResponse = await getOpenAIResponse(message);

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      await supabase
        .from('user_interactions')
        .insert({
          user_id: user.id,
          interaction_type: 'echois_message',
          content: message,
        });
    }

    return NextResponse.json({ response: aiResponse });
  } catch (err) {
    console.error('[Echois Route Error]', err);
    return NextResponse.json({ response: 'No resonance could be found.' }, { status: 500 });
  }
}


