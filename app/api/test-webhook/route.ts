import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST() {
  try {
    // Get current authenticated user from the request context
    const testEmail = 'officialnest9@gmail.com'; // Replace with actual user email
    
    console.log('🧪 Test webhook triggered for:', testEmail);
    
    // Simulate what the webhook should do
    const { data: profile, error: fetchError } = await supabase
      .from('profiles')
      .select('*')
      .eq('email', testEmail)
      .single();

    if (fetchError) {
      console.error('❌ Could not find profile:', fetchError);
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    console.log('📋 Current profile:', profile);

    // Update profile to seeker tier
    const { data, error } = await supabase
      .from('profiles')
      .update({
        stripe_id: 'test_customer_id',
        subscription_id: 'test_sub_id',
        is_active: true,
        is_upgraded: true,
        tier: 'seeker',
        message_limit: 777,
        max_messages: 777,
        message_count: 0,
      })
      .eq('email', testEmail)
      .select();

    if (error) {
      console.error('❌ Update failed:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log('✅ Profile updated via test webhook:', data);

    return NextResponse.json({ 
      success: true,
      message: 'Profile upgraded via test webhook',
      profile: data?.[0]
    });

  } catch (error) {
    console.error('🚨 Test webhook error:', error);
    return NextResponse.json({ 
      error: 'Test webhook failed',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}