import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';


export const config = {
  api: {
    bodyParser: false, // Required for raw body
  },
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  const sig = req.headers.get('stripe-signature')!;
  const readableToBuffer = async (readable: ReadableStream | null): Promise<Buffer> => {
    const reader = readable?.getReader();
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
  };

  const rawBody = await readableToBuffer(req.body);

  let event;

  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
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

    console.log('✨ Updating profile for user ID:', supabaseId);
    console.log('→ Tier:', tier, '| Limit:', message_limit);

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
      console.error('🔥 Supabase update error:', error.message);
      return new NextResponse(JSON.stringify({ error: 'Supabase update failed' }), { status: 500 });
    }

    console.log('🌟 Supabase profile updated successfully');
    return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
