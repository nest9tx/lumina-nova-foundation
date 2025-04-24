'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthCallbackHandler() {
  const router = useRouter();
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
}, [router, supabase.auth]); // Add supabase.auth to the dependency array

  return null;
}



