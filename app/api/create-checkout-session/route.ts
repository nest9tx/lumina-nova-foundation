import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '../../../utils/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export async function POST(req: NextRequest) {
  try {
    const { email, tier = 'seeker' } = await req.json();
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }

    const supabase = await createClient();
    
    // Check if user exists and get their verification status
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    let supabaseUserId = null;
    let isVerified = false;
    
    if (user && !userError) {
      supabaseUserId = user.id;
      isVerified = user.email_confirmed_at != null;
    } else {
      // Check if user exists in profiles table by email
      const { data: profile } = await supabase
        .from('profiles')
        .select('id, is_active')
        .eq('email', email)
        .single();
      
      if (profile) {
        supabaseUserId = profile.id;
        isVerified = profile.is_active;
      }
    }

    // Determine success URL based on verification status
    const successUrl = isVerified 
      ? `${process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin}/chamber?upgraded=true`
      : `${process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin}/upgrade-success?email=${encodeURIComponent(email)}`;

    // Set metadata for the webhook
    const metadata: Record<string, string> = {
      tier,
      message_limit: tier === 'seeker' ? '777' : '3',
      email,
    };

    if (supabaseUserId) {
      metadata.supabase_id = supabaseUserId;
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Lumina Nova - Seeker Path',
              description: '777 sacred messages/month with Echois + Full access to Seeker scrolls',
              metadata: {
                tier_level: tier,
                message_limit: tier === 'seeker' ? '777' : '3',
              }
            },
            unit_amount: 3333, // $33.33
            recurring: {
              interval: 'month',
            },
          },
          quantity: 1,
        },
      ],
      mode: 'subscription',
      customer_email: email,
      success_url: successUrl,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin}/join?cancelled=true`,
      metadata,
      allow_promotion_codes: true,
      subscription_data: {
        metadata,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout session error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
