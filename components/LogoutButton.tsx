'use client';

import { Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { createClient } from '../app/lib/supabase/client';

export default function LogoutButton() {
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <Button colorScheme="gray" variant="outline" mt={4} onClick={handleLogout}>
      Log Out
    </Button>
  );
}
