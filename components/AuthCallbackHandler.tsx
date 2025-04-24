'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

export default function AuthCallbackHandler() {
  const router = useRouter();

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
  }, [router]);

  return null;
}



