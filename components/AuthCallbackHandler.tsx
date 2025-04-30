'use client';

import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useEffect } from 'react';

export default function AuthCallbackHandler() {
  const router = useRouter(); // Fixed: Use useRouter() hook correctly
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { data, error } = await supabase.auth.getSession();

      if (error || !data.session) {
        console.error('🔴 Auth session error:', error?.message || 'No session');
        router.replace('/login');
        return;
      }

      router.replace('/chamber');
    };

    handleAuthCallback();
  }, [router, supabase.auth]); // Dependencies are correct

  return null;
}



