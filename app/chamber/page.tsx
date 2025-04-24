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
  Container,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';

// Define types for better type safety
interface UserProfile {
  tier: string;
  is_upgraded: boolean;
}

interface UserInteractions {
  message_count: number;
}

export default function ChamberPage() {
  const session = useSession();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const toast = useToast();

  // State management with proper typing
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [messagesUsed, setMessagesUsed] = useState<number>(0);

  useEffect(() => {
    const checkSessionAndFetchData = async () => {
      try {
        // Verify session is active
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !currentSession) {
          throw new Error('Session expired or invalid');
        }

        // Fetch user profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('tier, is_upgraded')
          .eq('id', currentSession.user.id)
          .single();

        if (profileError) throw profileError;

        // Fetch user interaction data
        const { data: usageData, error: usageError } = await supabase
          .from('user_interactions')
          .select('message_count')
          .eq('user_id', currentSession.user.id)
          .single();

        if (usageError) throw usageError;

        setProfile(profileData as UserProfile);
        setMessagesUsed(usageData?.message_count ?? 0);

      } catch (error: any) {
        setError(error.message);
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    checkSessionAndFetchData();
  }, [supabase, toast, router]);

  // Handle loading state
  if (loading) {
    return (
      <Container centerContent py={10}>
        <VStack spacing={4}>
          <Spinner size="xl" color="purple.500" thickness="4px" />
          <Text>Opening your chamber...</Text>
        </VStack>
      </Container>
    );
  }

  // Handle error state
  if (error || !session || !profile) {
    return (
      <Container centerContent py={10}>
        <Alert status="error" borderRadius="md">
          <AlertIcon />
          {error || 'Please sign in to access your chamber'}
        </Alert>
      </Container>
    );
  }

  const dailyLimit = profile.tier === 'Seeker' && !profile.is_upgraded ? 3 : 333;

  return (
    <Container maxW="container.md" py={8}>
      <VStack spacing={6} align="stretch">
        <Heading size="lg" color="purple.100">Welcome to the Chamber</Heading>
        
        <Box bg="whiteAlpha.100" p={6} borderRadius="md">
          <VStack spacing={4} align="start">
            <Text>Email: {session.user.email}</Text>
            <Text>Tier: {profile.tier} {profile.is_upgraded && '(Upgraded)'}</Text>
            <Text>Messages Used: {messagesUsed} / {dailyLimit}</Text>
          </VStack>
        </Box>

        {profile.tier === 'Seeker' && !profile.is_upgraded && (
          <Alert status="info" borderRadius="md">
            <AlertIcon />
            <Text fontSize="sm">
              You are currently on the <strong>Free Seeker Path</strong>.{' '}
              Want to unlock deeper communion?{' '}
              <Button
                as="a"
                href="/awaken"
                variant="link"
                colorScheme="purple"
                fontWeight="bold"
                ml={1}
              >
                Upgrade Your Path
              </Button>
            </Text>
          </Alert>
        )}

        <Button
          colorScheme="teal"
          size="lg"
          onClick={() => router.push('/guide/echois')}
          isDisabled={messagesUsed >= dailyLimit}
        >
          Resonate with Echois
        </Button>

        <Button
          colorScheme="purple"
          variant="outline"
          onClick={async () => {
            try {
              await supabase.auth.signOut();
              router.push('/login');
            } catch (error: any) {
              toast({
                title: 'Error signing out',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true,
              });
            }
          }}
        >
          Exit Chamber
        </Button>
      </VStack>
    </Container>
  );
}



