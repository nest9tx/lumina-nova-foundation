import { createBrowserClient } from '@supabase/ssr'

// Create a fresh Supabase client for testing
export function createTestClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  
  console.log('🔍 Creating test client with:', {
    hasUrl: !!supabaseUrl,
    hasKey: !!supabaseKey,
    url: supabaseUrl,
    keyLength: supabaseKey?.length
  })
  
  return createBrowserClient(supabaseUrl, supabaseKey)
}