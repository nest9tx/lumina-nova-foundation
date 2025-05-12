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
  
    const customerEmail = session.customer_email;
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;
    const supabaseId = metadata.supabase_id;
  
    // Default fallback values
    let tier = '';
    let message_limit = 0;
  
    try {
      // Retrieve expanded session with line_items and price metadata
      const expandedSession = await stripe.checkout.sessions.retrieve(session.id, {
        expand: ['line_items.data.price.product'],
      });
  
      const lineItem = expandedSession.line_items?.data?.[0];
      tier = lineItem?.price?.metadata?.tier_level || metadata.tier || '';
      message_limit = parseInt(
        lineItem?.price?.metadata?.message_limit || metadata.message_limit || '0',
        10
      );
    } catch (e) {
      console.warn('⚠️ Could not expand line item metadata:', e);
    }
  
    // Final fallback from session metadata if needed
    if (!tier && metadata.tier) tier = metadata.tier;
    if (!message_limit && metadata.message_limit)
      message_limit = parseInt(metadata.message_limit, 10);
  
    // Determine update match key: supabase_id or email
    const matchField = supabaseId ? { id: supabaseId } : { email: customerEmail };
  
    // 🔍 Debug log before update
    console.log('🔥 Webhook Data Received:', {
      email: customerEmail,
      supabaseId,
      tier,
      message_limit,
      matchField,
    });
  
    // Supabase update
    const { error, data } = await supabase
      .from('profiles')
      .update({
        stripe_id: customerId,
        subscription_id: subscriptionId,
        is_active: true,
        is_upgraded: tier !== 'seeker',
        tier,
        message_limit,
        max_messages: message_limit,
      })
      .match(matchField);
  
    if (error) {
      console.error('🛑 Supabase update error:', error.message);
      return new NextResponse(
        JSON.stringify({ error: 'Supabase update failed' }),
        { status: 500 }
      );
    }
  
    // ✅ Debug success confirmation
    console.log('✅ Supabase update result:', data);
    console.log('🌟 Supabase profile updated successfully');
  
    return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
  }
}  