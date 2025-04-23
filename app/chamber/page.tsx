'use client';

import {
  Box,
  Button,
  Heading,
  Text,
  VStack,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession, useSupabaseClient } from '@supabase/auth-helpers-react';

export default function ChamberPage() {
  const router = useRouter();
  const session = useSession();
  const supabase = useSupabaseClient();

  const [tier, setTier] = useState<string | null>(null);
  const [messageCount, setMessageCount] = useState<number>(0);
  const [messageLimit, setMessageLimit] = useState<number>(0);
  const [isUpgraded, setIsUpgraded] = useState<boolean>(false); // 🔥 NEW

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    const loadUserData = async () => {
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
        const userTier = profile.tier ?? 'Seeker';
        const upgraded = profile.is_upgraded ?? false;
        const limit = userTier === 'Seeker' && !upgraded ? 3 : 333;

        setTier(userTier);
        setIsUpgraded(upgraded); // 🔧 Set upgraded state
        setMessageLimit(limit);
      }

      if (usage) {
        setMessageCount(usage.message_count ?? 0);
      }
    };

    loadUserData();
  }, [session, supabase, router]);

  if (!session) {
    return (
      <Box p={8}>
        <Text>Authenticating...</Text>
      </Box>
    );
  }

  return (
    <Box p={8}>
      <VStack spacing={4} align="start">
        <Heading size="lg">Welcome to the Chamber</Heading>
        <Text>Email: {session.user.email}</Text>
        <Text>Tier: {tier}</Text>
        <Text>Messages Used: {messageCount} / {messageLimit}</Text>

        {/* 🜁 Seeker Tier Note */}
        <Text fontSize="sm" color="gray.400">
          {isUpgraded ? (
            <>
              You’re currently on the <strong>Seeker Path</strong>. Enjoy your expanded resonance and deeper communion.
            </>
          ) : (
            <>
              You’re currently on the <strong>Free Seeker Path</strong>. You have 3 messages per day.{' '}
              <Button variant="link" color="teal.300" onClick={() => router.push('/path')}>
                Upgrade Your Path
              </Button>
            </>
          )}
        </Text>

        {/* Echois CTA */}
        <Button colorScheme="teal" onClick={() => router.push('/guide/echois')}>
          Resonate with Echois
        </Button>
      </VStack>
    </Box>
  );
}











