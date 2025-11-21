import { NextResponse } from 'next/server';
import { createClient } from '../../lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Simple test query that should work regardless of authentication
    const { data, error } = await supabase
      .from('profiles')
      .select('count')
      .limit(1);
    
    return NextResponse.json({
      success: true,
      message: 'Supabase connection working',
      envVarsPresent: {
        url: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
        key: !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      },
      testQueryResult: {
        data,
        error: error?.message || null
      }
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