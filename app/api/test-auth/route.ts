import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json({
        error: 'Missing environment variables',
        hasUrl: !!supabaseUrl,
        hasKey: !!supabaseKey
      });
    }
    
    // Test the Auth settings endpoint directly
    const authSettingsUrl = `${supabaseUrl}/auth/v1/settings`;
    
    const response = await fetch(authSettingsUrl, {
      method: 'GET',
      headers: {
        'apikey': supabaseKey,
        'Content-Type': 'application/json',
      }
    });
    
    if (!response.ok) {
      return NextResponse.json({
        success: false,
        status: response.status,
        statusText: response.statusText,
        authUrl: authSettingsUrl,
        error: 'Auth endpoint not responding'
      });
    }
    
    const authSettings = await response.json();
    
    return NextResponse.json({
      success: true,
      authSettings,
      authUrl: authSettingsUrl
    });
    
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    return NextResponse.json({
      success: false,
      error: err.message,
      stack: err.stack
    }, { status: 500 });
  }
}