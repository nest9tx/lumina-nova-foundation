'use client';

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function AuthCallbackHandler() {
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (!session) {
          router.replace('/login');
          return;
        }
        router.replace('/chamber');
      } catch (error) {
        console.error('Auth error:', error);
        router.replace('/login');
      }
    };

    handleAuthCallback();
  }, [router]);

  return null;
}



