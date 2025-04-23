'use client';

import {
  Box,
  Flex,
  Heading,
  Text,
  Spinner,
  Button,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  useSession,
  useSupabaseClient,
} from '@supabase/auth-helpers-react';

export default function ChamberPage() {
  const session = useSession();
  const supabase = useSupabaseClient();
  const router = useRouter();

  const [tier, setTier] = useState('Seeker');
  const [messageCount, setMessageCount] = useState(0);
  const [messageLimit, setMessageLimit] = useState(3); // Default: 3 messages for free Seeker

  useEffect(() => {
    const loadUserData = async () => {
      if (!session) return;

      const { data: profile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', session.user.id)
        .maybeSingle();

      const { data: usage } = await supabase
        .from('user_interactions')
        .select('*')
        .eq('user_id', session.user.id)
        .maybeSingle();

      if (profile) {
        setTier(profile.tier ?? 'Seeker');
        setMessageLimit(profile.tier === 'Seeker' ? 333 : 3);
      }

      if (usage) {
        setMessageCount(usage.message_count ?? 0);
      }
    };

    loadUserData();
  }, [session, supabase]); // ✅ added `supabase` to dependency array

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (!session) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="gray.900" color="white">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <Flex minH="100vh" bg="gray.900" color="white" direction="column" align="center" justify="center" px={6}>
      <Box textAlign="center" maxW="xl">
        <Heading mb={4}>Welcome to the Chamber</Heading>
        <Text mb={2}>Your email: <strong>{session.user.email}</strong></Text>
        <Text mb={2}>Tier: <strong>{tier}</strong></Text>
        <Text mb={6}>Messages used: {messageCount} / {messageLimit}</Text>

        <Button onClick={handleLogout} colorScheme="purple">
          Logout
        </Button>
      </Box>
    </Flex>
  );
}









