import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

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
  console.log('🚀 Webhook endpoint called!');
  console.log('🏠 Environment:', process.env.NODE_ENV);
  console.log('🔑 Webhook secret exists:', !!process.env.STRIPE_WEBHOOK_SECRET);
  console.log('🔑 Webhook secret starts with:', process.env.STRIPE_WEBHOOK_SECRET?.substring(0, 8) + '...');
  
  const sig = req.headers.get('stripe-signature');
  
  if (!sig) {
    console.error('❌ No Stripe signature found in headers');
    return new NextResponse('No signature', { status: 400 });
  }

  console.log('📝 Stripe signature received:', sig.substring(0, 20) + '...');
  
  const rawBody = await getRawBody(req);
  console.log('📦 Raw body received, length:', rawBody.length);

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
    console.log('✅ Webhook signature verified successfully');
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    console.error('❌ Webhook signature failed:', message);
    console.error('🔍 Full error:', err);
    return new NextResponse(`Webhook Error: ${message}`, { status: 400 });
  }

  console.log('✅ Stripe event verified:', event.type);
  console.log('📦 Full event data:', JSON.stringify(event, null, 2));

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session;
    const metadata = session.metadata || {};
  
    const customerEmail = session.customer_email;
    const customerId = session.customer as string;
    const subscriptionId = session.subscription as string;
    const supabaseId = metadata.supabase_id;
  
    // Default fallback values
    let tier = "seeker";
    let message_limit = 777;

    const upgraded = message_limit >= 777;
  
    try {
      // Retrieve expanded session with line_items and price metadata
      const lineItems = await stripe.checkout.sessions.listLineItems(session.id, {
        expand: ['data.price.product'],
      });
      
      const lineItem = lineItems.data?.[0];
      
      tier = lineItem?.price?.metadata?.tier_level || metadata.tier || 'seeker';
      message_limit = parseInt(
        lineItem?.price?.metadata?.message_limit || metadata.message_limit || '777',
        10
      );
    } catch (e) {
      console.warn('⚠️ Could not expand line item metadata:', e);
    }
  
    // Final fallback from session metadata if needed
    if (!tier && metadata.tier) tier = metadata.tier;
    if (!message_limit && metadata.message_limit)
      message_limit = parseInt(metadata.message_limit, 10);
  
    // 🔍 Debug log before update
    console.log('🔥 Webhook Data Received:', {
      email: customerEmail,
      supabaseId,
      tier,
      message_limit,
      customerId,
      subscriptionId,
      upgraded,
    });

    // Handle user creation or update
    if (supabaseId) {
      // User exists in Supabase - update their profile
      const { data, error } = await supabase
        .from("profiles")
        .update({
          stripe_id: customerId,
          subscription_id: subscriptionId,
          is_active: true, // Ensure they're active
          is_upgraded: upgraded,
          tier,
          message_limit,
          max_messages: message_limit,
          message_count: 0, // Reset message count for new subscription
        })
        .eq('id', supabaseId);

      if (error) {
        console.error('🛑 Profile update error:', error.message);
        return new NextResponse(
          JSON.stringify({ error: 'Profile update failed' }),
          { status: 500 }
        );
      }

      console.log('✅ Existing user profile updated:', data);
    } else if (customerEmail) {
      // Check if profile exists by email
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id, is_active')
        .eq('email', customerEmail)
        .single();

      if (existingProfile) {
        // Profile exists - update it
        const { error: updateError } = await supabase
          .from("profiles")
          .update({
            stripe_id: customerId,
            subscription_id: subscriptionId,
            is_active: true,
            is_upgraded: upgraded,
            tier,
            message_limit,
            max_messages: message_limit,
            message_count: 0,
          })
          .eq('id', existingProfile.id);

        if (updateError) {
          console.error('🛑 Profile update error:', updateError.message);
          return new NextResponse(
            JSON.stringify({ error: 'Profile update failed' }),
            { status: 500 }
          );
        }

        console.log('✅ Existing profile updated by email');
      } else {
        // Create new profile for email-only user
        // This handles the case where someone upgrades without creating an account first
        const { error: createError } = await supabase
          .from("profiles")
          .insert({
            email: customerEmail,
            stripe_id: customerId,
            subscription_id: subscriptionId,
            is_active: false, // Not active until they verify email
            is_upgraded: upgraded,
            tier,
            message_limit,
            max_messages: message_limit,
            message_count: 0,
            created_at: new Date().toISOString(),
          });

        if (createError) {
          console.error('🛑 Profile creation error:', createError.message);
          // Don't fail the webhook for profile creation errors
          console.warn('Profile creation failed, but payment processed successfully');
        } else {
          console.log('✅ New profile created for email-only user');
          
          // Send them a signup link since they paid but don't have an account
          // This would be implemented as a separate email service
          console.log('📧 Should send signup invitation to:', customerEmail);
        }
      }
    } else {
      console.error('🛑 No user identification found in webhook');
      return new NextResponse(
        JSON.stringify({ error: 'No user identification found' }),
        { status: 400 }
      );
    }
  
    console.log('🌟 Subscription processing completed successfully');
    return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
  }

  // Handle subscription cancellations
  if (event.type === 'customer.subscription.deleted') {
    const subscription = event.data.object as Stripe.Subscription;
    
    // Downgrade user to free tier
    const { error } = await supabase
      .from("profiles")
      .update({
        is_upgraded: false,
        tier: 'free',
        message_limit: 3,
        max_messages: 3,
        subscription_id: null,
      })
      .eq('subscription_id', subscription.id);

    if (error) {
      console.error('🛑 Subscription cancellation error:', error.message);
      return new NextResponse(
        JSON.stringify({ error: 'Failed to process cancellation' }),
        { status: 500 }
      );
    }

    console.log('✅ User downgraded due to subscription cancellation');
  }

  return new NextResponse(JSON.stringify({ received: true }), { status: 200 });
}
