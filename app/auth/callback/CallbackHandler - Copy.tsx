'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';

export default function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const completeLogin = async () => {
      const code = searchParams?.get('code');
      if (!code) return;

      const { error } = await supabase.auth.exchangeCodeForSession(code);

      if (error) {
        console.error('Session exchange failed:', error.message);
        router.push('/login'); // fallback in case of failure
        return;
      }

      console.log('Session confirmed. Redirecting to dashboard...');
      router.push('/dashboard');
    };

    completeLogin();
  }, [searchParams, supabase, router]);

  return (
    <div style={{ textAlign: 'center', marginTop: '100px' }}>
      <h2>Completing Your Path ✨</h2>
      <p>Breathing life into your session...</p>
    </div>
  );
}
