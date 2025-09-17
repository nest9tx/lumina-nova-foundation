'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '../../../utils/supabase/client';
import { Box, Spinner, Text, VStack, Alert, AlertIcon, Button } from '@chakra-ui/react';

export default function AuthCallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [error, setError] = useState<string | null>(null);
  const supabase = createClient();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        // Exchange the code for a session
        const { data, error: exchangeError } = await supabase.auth.exchangeCodeForSession(
          searchParams.get('code') || ''
        );

        if (exchangeError) {
          console.error('Auth exchange error:', exchangeError);
          setError(exchangeError.message);
          return;
        }

        if (!data.user) {
          setError('No user found after authentication');
          return;
        }

        // Check if user profile exists
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', data.user.id)
          .single();

        // Create profile if it doesn't exist
        if (profileError && profileError.code === 'PGRST116') {
          console.log('Creating new user profile...');
          const { error: insertError } = await supabase
            .from('profiles')
            .insert({
              id: data.user.id,
              email: data.user.email,
              tier: 'free',
              message_limit: 3,
              max_messages: 3,
              message_count: 0,
              is_active: true, // User is now verified
              is_upgraded: false,
              created_at: new Date().toISOString(),
            });

          if (insertError) {
            console.error('Profile creation error:', insertError);
            // Don't block login for profile creation errors
            console.warn('Profile creation failed, but allowing login to continue');
          }
        } else if (profileError) {
          console.error('Profile fetch error:', profileError);
        } else if (profile) {
          // Update the is_active status since they've verified their email
          await supabase
            .from('profiles')
            .update({ is_active: true })
            .eq('id', data.user.id);
        }

        // Refresh the session to ensure it's properly established
        await supabase.auth.refreshSession();
        
        // Give a moment for session to be established before redirect
        setTimeout(() => {
          router.replace('/chamber');
        }, 1000);
      } catch (error) {
        console.error('Callback handler error:', error);
        setError('An unexpected error occurred during authentication');
      }
    };

    // Only run if we have the code parameter
    if (searchParams.get('code')) {
      handleAuthCallback();
    } else {
      // No code parameter, redirect to signup
      router.replace('/signup');
    }
  }, [router, searchParams, supabase]);

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
