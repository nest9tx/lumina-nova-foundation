// src/app/verify/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../lib/supabase/client';
import { Box, Text } from '@chakra-ui/react';

export default function VerifyPage() {
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
  const handleVerification = async () => {
    const url = new URL(window.location.href);
    const accessToken = url.searchParams.get('access_token');
    const refreshToken = url.searchParams.get('refresh_token');

    if (accessToken && refreshToken) {
      await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      const newUrl = new URL(window.location.href);
      newUrl.searchParams.delete('access_token');
      newUrl.searchParams.delete('refresh_token');
      window.history.replaceState({}, document.title, newUrl.toString());
    }

    router.push('/chamber');
  };

  handleVerification();
}, [router, supabase.auth]); // ✅ Lint-safe dependencies

  return (
    <Box p={8}>
      <Text>Verifying your email and preparing your chamber…</Text>
    </Box>
  );
}

