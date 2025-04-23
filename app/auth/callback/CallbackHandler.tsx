'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';

export default function AuthCallbackHandler() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      // Wait a bit to ensure Supabase session is hydrated
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!session || error) {
        console.error('🔴 Session missing or invalid after callback', error);
        router.replace('/login');
        return;
      }

      // Optional: fetch user here to verify further if needed
      router.replace('/chamber');
    };

    checkSession();
  }, [router]);

  return null;
}

