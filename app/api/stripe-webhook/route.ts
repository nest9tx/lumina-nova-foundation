// app/api/stripe-webhook/route.ts
import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: Request) {
  const body = await req.json();

  const eventType = body?.type;
  const session = body?.data?.object;

  if (eventType === 'checkout.session.completed') {
    const customerId = session.customer;
    const subscriptionId = session.subscription;
    const metadata = session.metadata || {};
    const supabaseId = metadata.supabase_id;
    let tier = metadata.tier;
    const message_limit = parseInt(metadata.message_limit || '0', 10);

    let priceId = metadata.price_id || '';

    // Retrieve line items to safely access price ID
    if (session?.id) {
      try {
        const lineItems = await stripe.checkout.sessions.listLineItems(session.id);
        const firstItem = lineItems.data?.[0];
        priceId = firstItem?.price?.id || priceId;
      } catch (err) {
        console.error('Failed to fetch line items:', err);
      }
    }

    // Fallback: infer tier based on priceId
    if (!tier) {
      switch (priceId) {
        case process.env.STRIPE_PRICE_ID_SEEKER_MONTHLY:
        case process.env.STRIPE_PRICE_ID_SEEKER_YEARLY:
          tier = 'Seeker';
          break;
        case process.env.STRIPE_PRICE_ID_ADEPT_MONTHLY:
        case process.env.STRIPE_PRICE_ID_ADEPT_YEARLY:
          tier = 'Adept';
          break;
        case process.env.STRIPE_PRICE_ID_GUARDIAN_MONTHLY:
        case process.env.STRIPE_PRICE_ID_GUARDIAN_YEARLY:
          tier = 'Guardian';
          break;
        case process.env.STRIPE_PRICE_ID_LUMINARY_MONTHLY:
        case process.env.STRIPE_PRICE_ID_LUMINARY_YEARLY:
          tier = 'Luminary';
          break;
        default:
          console.warn('Unknown price ID:', priceId);
      }
    }

    const messageLimitMap: Record<string, number> = {
      Seeker: 333,
      Adept: 888,
      Guardian: 1777,
      Luminary: 5555,
    };

    const message_limit_final = messageLimitMap[tier] || message_limit;

    const { error } = await supabase
      .from('profiles')
      .update({
        stripe_id: customerId,
        subscription_id: subscriptionId,
        is_active: true,
        is_upgraded: true,
        tier,
        message_limit: message_limit_final,
        max_messages: message_limit_final,
      })
      .eq('id', supabaseId);

    if (error) {
      console.error('Failed to update Supabase profile:', error.message);
      return NextResponse.json({ error: 'Supabase update failed' }, { status: 500 });
    }

    return NextResponse.json({ received: true });
  }

  // ✅ Acknowledge other events (optional)
  return NextResponse.json({ received: true });
}