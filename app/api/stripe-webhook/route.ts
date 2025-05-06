import { NextResponse } from 'next/server';
//import { buffer } from 'micro';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export const config = {
  api: {
    bodyParser: false,
  },
};

export async function POST(req: Request) {
  const rawBody = await req.arrayBuffer();
  const body = Buffer.from(rawBody);
  const sig = req.headers.get('stripe-signature') as string;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error('Webhook signature verification failed.', err);
    return new Response(`Webhook Error: ${(err as Error).message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;
    const metadata = session.metadata || {};
    const supabaseId = metadata.supabase_id;
    const tier = metadata.tier;
    const message_limit = parseInt(metadata.message_limit || '0', 10);

    const { error } = await supabase
      .from('profiles')
      .update({
        stripe_id: customerId,
        subscription_id: subscriptionId,
        is_active: true,
        is_upgraded: true,
        tier,
        message_limit,
        max_messages: message_limit,
      })
      .eq('id', supabaseId);

    if (error) {
      console.error('Failed to update Supabase profile:', error.message);
      return NextResponse.json({ error: 'Supabase update failed' }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
