'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import {
  Box,
  Text,
  Heading,
  Button,
  VStack,
  Spinner,
  useToast,
} from '@chakra-ui/react';

export default function ChamberPage() {
  const session = useSession();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [tier, setTier] = useState<string | null>(null);
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [messagesUsed, setMessagesUsed] = useState<number | null>(null);

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    const fetchUserData = async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('tier, is_upgraded')
        .eq('id', session.user.id)
        .single();

      if (error) {
        toast({
          title: 'Failed to load user data',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        return;
      }

      setTier(data.tier);
      setIsUpgraded(data.is_upgraded);

      const { data: usageData } = await supabase
        .from('user_interactions')
        .select('message_count')
        .eq('user_id', session.user.id)
        .single();

      setMessagesUsed(usageData?.message_count ?? 0);
      setLoading(false);
    };

    fetchUserData();
  }, [session, supabase, toast, router]);

  if (!session || loading) {
    return (
      <Box p={6} textAlign="center">
        <Spinner />
      </Box>
    );
  }

  const dailyLimit = tier === 'Seeker' && !isUpgraded ? 3 : 333;

  return (
    <Box p={6}>
      <VStack spacing={4} align="start">
        <Heading size="lg">Welcome to the Chamber</Heading>
        <Text>Email: {session.user.email}</Text>
        <Text>Tier: {tier} {isUpgraded && "(Upgraded)"}</Text>
        <Text>Messages Used: {messagesUsed} / {dailyLimit}</Text>

        {/* 🜁 Seeker Tier Note */}
        {tier === 'Seeker' && !isUpgraded && (
          <Text fontSize="sm" color="gray.500">
            You’re currently on the <strong>Free Seeker Path</strong>. Want to unlock deeper communion?{" "}
            <Button
              as="a"
              href="/awaken"
              variant="link"
              colorScheme="teal"
              fontWeight="bold"
              pl={1}
            >
              Upgrade Your Path
            </Button>
          </Text>
        )}

        <Button colorScheme="teal" onClick={() => router.push('/guide/echois')}>
          Resonate with Echois
        </Button>

        <Button
          colorScheme="purple"
          variant="outline"
          onClick={async () => {
            await supabase.auth.signOut();
            router.push('/login');
          }}
        >
          Logout
        </Button>
      </VStack>
    </Box>
  );
}












