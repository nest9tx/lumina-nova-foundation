'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

export default function AuthCallbackHandler() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      const { error } = await supabase.auth.getSession();

      if (error) {
        console.error('🔴 Auth session error:', error.message);
      }

      router.replace('/chamber');
    };

    handleAuthCallback();
  }, [router]);

  return null;
}


