'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Box,
  Text,
  Heading,
  Button,
  VStack,
  Spinner,
  useToast,
  Container,
} from '@chakra-ui/react';

export default function ChamberPage() {
  const router = useRouter();
  const supabase = createClientComponentClient();
  const toast = useToast();

  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState(null);
  const [tier, setTier] = useState<string | null>(null);
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [messagesUsed, setMessagesUsed] = useState<number | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session: currentSession }, error: sessionError } = await supabase.auth.getSession();
        
        if (sessionError || !currentSession) {
          router.push('/login');
          return;
        }

        setSession(currentSession);

        // Fetch user profile data
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('tier, is_upgraded')
          .eq('id', currentSession.user.id)
          .single();

        if (profileError) {
          throw profileError;
        }

        setTier(profileData.tier);
        setIsUpgraded(profileData.is_upgraded);

        // Fetch usage data
        const { data: usageData, error: usageError } = await supabase
          .from('user_interactions')
          .select('message_count')
          .eq('user_id', currentSession.user.id)
          .single();

        if (usageError) {
          console.error('Usage data error:', usageError);
        }

        setMessagesUsed(usageData?.message_count ?? 0);
      } catch (error) {
        toast({
          title: 'Error',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Set up auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        if (event === 'SIGNED_OUT') {
          router.push('/login');
        }
      }
    );

    return () => subscription.unsubscribe();
  }, [supabase, router, toast]);

  if (loading) {
    return (
      <Container maxW="100vw" minH="100vh" bg="navy.900" centerContent>
        <Box p={6} textAlign="center">
          <Spinner color="purple.400" size="xl" />
        </Box>
      </Container>
    );
  }

  const dailyLimit = tier === 'Seeker' && !isUpgraded ? 3 : 333;

  return (
    <Container maxW="100vw" minH="100vh" bg="navy.900" p={0}>
      <Box
        p={8}
        bg="rgba(0, 0, 0, 0.6)"
        borderRadius="lg"
        boxShadow="dark-lg"
        m={4}
        border="1px solid"
        borderColor="purple.500"
      >
        <VStack spacing={6} align="start">
          <Heading size="lg" color="white">Welcome to the Chamber</Heading>
          <Text color="purple.200">Email: {session?.user?.email}</Text>
          <Text color="purple.200">
            Tier: {tier} {isUpgraded && '(Upgraded)'}
          </Text>
          <Text color="purple.200">
            Messages Used: {messagesUsed} / {dailyLimit}
          </Text>

          {tier === 'Seeker' && !isUpgraded && (
            <Text fontSize="sm" color="gray.400">
              You're currently on the <strong>Free Seeker Path</strong>. 
              Want to unlock deeper communion?{' '}
              <Button
                as="a"
                href="/awaken"
                variant="link"
                color="purple.300"
                fontWeight="bold"
                pl={1}
                _hover={{ color: "purple.200" }}
              >
                Upgrade Your Path
              </Button>
            </Text>
          )}

          <Button
            colorScheme="purple"
            onClick={() => router.push('/guide/echois')}
            w="full"
          >
            Resonate with Echois
          </Button>

          <Button
            colorScheme="purple"
            variant="outline"
            w="full"
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/login');
            }}
          >
            Logout
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}












