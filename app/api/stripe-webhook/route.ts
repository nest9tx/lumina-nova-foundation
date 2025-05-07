import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

// Remove if unused
// import { buffer } from 'micro';
// import type { Readable } from 'node:stream';

export const config = {
  api: {
    bodyParser: false,
  },
};

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

// Read raw body manually from the request
async function getRawBody(req: Request): Promise<Buffer> {
  const reader = req.body?.getReader();
  const chunks: Uint8Array[] = [];

  if (reader) {
    let done = false;
    while (!done) {
      const { value, done: readerDone } = await reader.read();
      if (value) chunks.push(value);
      done = readerDone;
    }
  }

  return Buffer.concat(chunks);
}

// Webhook handler
export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')!;
  const rawBody = await getRawBody(req);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('❌ Webhook signature failed:', message);
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  console.log('✅ Stripe event verified:', event.type);

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};

    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;
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
      console.error('🛑 Supabase update error:', error.message);
      return new NextResponse(
        JSON.stringify({ error: 'Supabase update failed' }),
        { status: 500 }
      );
    }

    console.log('🌟 Supabase profile updated successfully');
    return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
  }

  // Catch-all response for unhandled event types
  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
