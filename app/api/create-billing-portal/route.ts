import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '../../lib/supabase/server';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2025-04-30.basil',
});

export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    
    // Get the current user
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get user's profile with Stripe ID
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('stripe_id')
      .eq('id', user.id)
      .single();

    if (profileError || !profile?.stripe_id) {
      return NextResponse.json({ 
        error: 'No billing account found',
        supportEmail: 'admin@luminanova.org',
        message: 'Please contact support to manage your subscription'
      }, { status: 404 });
    }

    // Create billing portal session
    try {
      const portalSession = await stripe.billingPortal.sessions.create({
        customer: profile.stripe_id,
        return_url: `${process.env.NEXT_PUBLIC_BASE_URL || req.nextUrl.origin}/chamber`,
      });

      return NextResponse.json({ url: portalSession.url });
    } catch (stripeError) {
      console.error('Stripe billing portal error:', stripeError);
      return NextResponse.json({ 
        error: 'Billing portal temporarily unavailable',
        supportEmail: 'admin@luminanova.org',
        message: 'Please email admin@luminanova.org to manage your subscription'
      }, { status: 503 });
    }
  } catch (error) {
    console.error('Billing portal error:', error);
    return NextResponse.json(
      { error: 'Failed to create billing portal session' },
      { status: 500 }
    );
  }
}