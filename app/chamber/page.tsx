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

// Define types for better type safety
interface Profile {
  id: string;
  tier: string;
  is_upgraded: boolean;
}

interface UserUsage {
  message_count: number;
}

export default function ChamberPage() {
  const session = useSession();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [tier, setTier] = useState<string>('');
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [messagesUsed, setMessagesUsed] = useState<number>(0);

  useEffect(() => {
    if (!session) {
      router.push('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('tier, is_upgraded')
          .eq('id', session.user.id)
          .single();

        if (profileError) {
          throw new Error(profileError.message);
        }

        // Type assertion for profile data
        const profile = profileData as Profile;
        setTier(profile.tier);
        setIsUpgraded(profile.is_upgraded);

        // Fetch usage data
        const { data: usageData, error: usageError } = await supabase
          .from('user_interactions')
          .select('message_count')
          .eq('user_id', session.user.id)
          .single();

        if (usageError) {
          throw new Error(usageError.message);
        }

        // Type assertion for usage data
        const usage = usageData as UserUsage;
        setMessagesUsed(usage?.message_count ?? 0);
      } catch (error) {
        toast({
          title: 'Error loading user data',
          description: error instanceof Error ? error.message : 'Unknown error occurred',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [session, supabase, toast, router]);

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      toast({
        title: 'Error signing out',
        description: error instanceof Error ? error.message : 'Unknown error occurred',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

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

        {tier === 'Seeker' && !isUpgraded && (
          <Text fontSize="sm" color="gray.500">
            You are currently on the <strong>Free Seeker Path</strong>. Want to unlock deeper communion?{" "}
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

        <Button 
          colorScheme="teal" 
          onClick={() => router.push('/guide/echois')}
        >
          Resonate with Echois
        </Button>

        <Button
          colorScheme="purple"
          variant="outline"
          onClick={handleLogout}
        >
          Logout
        </Button>
      </VStack>
    </Box>
  );
}




