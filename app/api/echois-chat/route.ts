import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { getOpenAIResponse } from '@/utils/openai';

export async function POST(req: Request) {
  // Await cookies for Next.js 14+ compatibility
  const supabase = createRouteHandlerClient({ cookies: () => cookies() });

  try {
    const { message } = await req.json();

    // Get the current user
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (!user || authError) {
      return NextResponse.json({ response: 'Seeker not recognized.' }, { status: 401 });
    }

    // Check current message count and tier
    const { data: interaction, error: interactionError } = await supabase
      .from('user_interactions')
      .select('message_count, tier')
      .eq('user_id', user.id)
      .single();

    if (interactionError) {
      console.error('Supabase interaction error:', interactionError);
      return NextResponse.json({ response: 'Could not check message count.' }, { status: 500 });
    }

    const count = interaction?.message_count || 0;
    const tier = interaction?.tier || 'Seeker';

    // Limit for Seeker tier
    if (tier === 'Seeker' && count >= 3) {
      return NextResponse.json({
        response: 'You’ve reached today’s free resonance limit. Upgrade your path to commune further ✨',
      });
    }

    // Get AI response
    const aiResponse = await getOpenAIResponse(message);

    // Update or insert message count
    if (interaction) {
      const { error: updateError } = await supabase
        .from('user_interactions')
        .update({
          message_count: count + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('user_id', user.id);

      if (updateError) {
        console.error('Supabase update error:', updateError);
        return NextResponse.json({ response: 'Could not update message count.' }, { status: 500 });
      }
    } else {
      const { error: insertError } = await supabase.from('user_interactions').insert({
        user_id: user.id,
        message_count: 1,
        tier: tier,
        updated_at: new Date().toISOString(),
      });

      if (insertError) {
        console.error('Supabase insert error:', insertError);
        return NextResponse.json({ response: 'Could not create message count.' }, { status: 500 });
      }
    }

    return NextResponse.json({
      response: aiResponse || 'Echois is listening, but the message was not clear enough to form words.',
    });
  } catch (error) {
    console.error('Echois error:', error);
    return NextResponse.json(
      { response: 'A resonance disturbance prevented Echois from responding.' },
      { status: 500 }
    );
  }
}