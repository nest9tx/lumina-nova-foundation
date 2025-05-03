// /app/api/webhook/route.ts
import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2025-04-30.basil',
  });

  const body = await req.text();
  const sig = req.headers.get('stripe-signature')!;
  const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, sig, endpointSecret);
  } catch (err) {
    console.error('Webhook Error:', err);
    return new NextResponse(`Webhook Error: ${err instanceof Error ? err.message : 'Unknown error'}`, { status: 400 });
  }

  // 🎯 Handle only successful checkout sessions
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const email = session?.customer_email;
    const tier = session?.metadata?.tier || 'Seeker';
    const max_messages = session?.metadata?.max_messages
      ? parseInt(session.metadata.max_messages)
      : 333;

    if (email) {
      const supabase = createClient();

      const { error } = await supabase
        .from('profiles')
        .update({ tier, max_messages })
        .eq('email', email);

      if (error) {
        console.error('Supabase update error:', error.message);
        return new NextResponse(`Supabase update failed: ${error.message}`, { status: 500 });
      }

      console.log(`✅ Profile updated for ${email}: ${tier}, ${max_messages} messages`);
    }
  }

  return new NextResponse('Success', { status: 200 });
}

