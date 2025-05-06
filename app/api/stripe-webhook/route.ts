// app/api/stripe-webhook/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { headers } from 'next/headers';

export const config = {
  api: {
    bodyParser: false,
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export async function POST(req: NextRequest) {
  const sig = (await headers()).get('stripe-signature')!;
  const rawBody = await req.text();

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('Webhook signature verification failed:', message);
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;

    // Optional metadata use
    const metadata = session.metadata || {};
    const supabaseId = metadata.supabase_id;
    const tier = metadata.tier;
    const message_limit = parseInt(metadata.message_limit || '0', 10);

    // TODO: Connect to Supabase and update here
    console.log('✅ Webhook received. Ready to update Supabase with:', {
      supabaseId,
      tier,
      message_limit,
    });
  }

  return new NextResponse('Webhook received', { status: 200 });
}


