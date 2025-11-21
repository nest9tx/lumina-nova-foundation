'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '../../lib/supabase/client';
import { Box, Spinner, Text, VStack, Alert, AlertIcon, Button } from '@chakra-ui/react';

export default function AuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Check if we have auth parameters
        const code = searchParams.get('code');
        const error_description = searchParams.get('error_description');

        // Handle auth errors
        if (error_description) {
          setError(error_description);
          setLoading(false);
          return;
        }

        // Handle auth success
        if (code) {
          // Wait a moment for the auth state to be processed
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Get the session after auth processing
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();

          if (sessionError) {
            console.error('Session error:', sessionError);
            setError('Failed to get session');
            setLoading(false);
            return;
          }

          if (!session?.user) {
            setError('No session found - please try signing in again');
            setLoading(false);
            return;
          }

          const user = session.user;

          // Handle profile creation/update
          const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

          if (profileError && profileError.code === 'PGRST116') {
            // Create new profile
            await supabase
              .from('profiles')
              .insert({
                id: user.id,
                email: user.email,
                tier: 'free',
                message_limit: 3,
                max_messages: 3,
                message_count: 0,
                is_active: true,
                is_upgraded: false,
                created_at: new Date().toISOString(),
              });
          } else if (profile) {
            // Update existing profile
            await supabase
              .from('profiles')
              .update({ is_active: true })
              .eq('id', user.id);
          }

          // Wait longer for session sync across server/client
          await new Promise(resolve => setTimeout(resolve, 2000));
          
          // Refresh auth state and verify session
          await supabase.auth.refreshSession();
          const { data: { session: finalSession } } = await supabase.auth.getSession();
          
          if (finalSession?.user) {
            console.log('Auth callback - Session verified, redirecting to chamber');
            // Force a hard redirect to ensure middleware sees the session
            window.location.href = '/chamber';
          } else {
            setError('Session verification failed - please try signing in again');
            setLoading(false);
          }
        } else {
          // No code parameter
          setError('No authorization code found');
          setLoading(false);
        }
      } catch (error) {
        console.error('Callback handler error:', error);
        setError('An unexpected error occurred during authentication');
        setLoading(false);
      }
    };

    handleAuthCallback();
  }, [router, searchParams, supabase]);

  if (loading) {
    return (
      <Box
        minH="100vh"
        bg="#0a0a12"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <VStack spacing={4}>
          <Spinner size="xl" color="purple.300" />
          <Text color="white" fontSize="lg">Confirming your authentication...</Text>
          <Text color="purple.200" fontSize="sm">Please wait while we verify your account.</Text>
        </VStack>
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        minH="100vh"
        bg="#0a0a12"
        display="flex"
        alignItems="center"
        justifyContent="center"
        px={4}
      >
        <Box
          bg="#181828"
          borderRadius="lg"
          boxShadow="0 0 0 1.5px #ef4444"
          px={8}
          py={8}
          maxW="400px"
        >
          <VStack spacing={4}>
            <Alert status="error" bg="#1f1f1f" borderColor="#ef4444" borderWidth="1px">
              <AlertIcon color="#ef4444" />
              <Box>
                <Text color="white" fontWeight="bold">Authentication Failed</Text>
                <Text color="red.300" fontSize="sm">{error}</Text>
              </Box>
            </Alert>
            <Button
              colorScheme="red"
              variant="outline"
              onClick={() => router.push('/signup')}
            >
              Back to Signup
            </Button>
          </VStack>
        </Box>
      </Box>
    );
  }

  return (
    <Box
      minH="100vh"
      bg="#0a0a12"
      display="flex"
      alignItems="center"
      justifyContent="center"
      color="white"
    >
      <VStack spacing={6}>
        <Spinner size="lg" color="purple.300" />
        <Text fontSize="lg">Confirming your seeker portal...</Text>
        <Text fontSize="sm" color="purple.200">
          Aligning your path. Please hold the field. 🌀
        </Text>
      </VStack>
    </Box>
  );
}
