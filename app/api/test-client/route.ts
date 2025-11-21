import { NextResponse } from 'next/server';

export async function GET() {
  try {
    console.log('🔍 Environment check:');
    console.log('NEXT_PUBLIC_SUPABASE_URL:', !!process.env.NEXT_PUBLIC_SUPABASE_URL);
    console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY:', !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    
    // Try importing the client
    const { createClient } = await import('../../lib/supabase/client');
    console.log('✅ createClient imported successfully');
    
    // Try creating the client
    const supabase = createClient();
    console.log('✅ Supabase client created:', !!supabase);
    
    // Test a simple auth call
    const { data, error } = await supabase.auth.getSession();
    console.log('✅ Auth getSession called:', { hasData: !!data, error: error?.message });
    
    return NextResponse.json({
      success: true,
      envVars: {
        hasUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        hasKey: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      },
      clientCreated: !!supabase,
      authTest: {
        hasData: !!data,
        error: error?.message || null
      }
    });
    
  } catch (error: unknown) {
    const err = error instanceof Error ? error : new Error('Unknown error');
    console.error('❌ Error in client test:', err);
    return NextResponse.json({
      success: false,
      error: err.message,
      stack: err.stack
    }, { status: 500 });
  }
}