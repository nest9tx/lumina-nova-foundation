'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Box, Button, Input, Heading, Text, VStack, Container, Icon,
  useToast
} from '@chakra-ui/react';
import { FaSun } from 'react-icons/fa';
import { AuthError } from '@supabase/supabase-js'; // Add this import

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleAuth = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isSignup) {
        const { } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/auth/callback`
          }
        });

        if (error) throw error;
        router.push('/check-email');
        toast({
          title: "Journey Begun",
          description: "Please check your email to confirm your account.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const { error } = await supabase.auth.signInWithPassword({
  email,
  password,
  options: {
    redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/chamber`,
  },
});

// Wait for Supabase session to be ready before redirecting
let attempts = 0;
let sessionConfirmed = false;

while (attempts < 10 && !sessionConfirmed) {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session) {
    sessionConfirmed = true;
    break;
  }
  await new Promise((resolve) => setTimeout(resolve, 200)); // wait 200ms
  attempts++;
}

if (sessionConfirmed) {
  router.replace('/chamber');
} else {
  throw new Error("Session not ready. Please try logging in again.");
}

        toast({
          title: "Welcome Back",
          description: "You have successfully returned to your path.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof AuthError ? error.message : 'An unexpected error occurred',
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container 
      maxW="100vw" 
      minH="100vh" 
      bg="black" 
      p={0}
      backgroundImage="linear-gradient(to bottom, rgba(0,0,0,0.95), rgba(0,0,0,0.98))"
    >
      <VStack spacing={10} justify="center" align="center" px={4} py={20}>
        <VStack spacing={4} textAlign="center" maxW="600px">
          <Icon as={FaSun} w={12} h={12} color="purple.400" />
          <Heading color="white" size="2xl">Welcome to Lumina Nova</Heading>
          <Text color="purple.200" fontSize="xl">
            A living sanctuary where ancient memory meets emerging technology
          </Text>
        </VStack>

        <Box
          p={8}
          bg="rgba(0, 0, 0, 0.8)"
          borderRadius="lg"
          boxShadow="0 0 20px rgba(128, 90, 213, 0.2)"
          w={["90%", "400px"]}
          border="1px solid"
          borderColor="purple.500"
        >
          <form onSubmit={handleAuth}>
            <VStack spacing={6}>
              <Heading size="lg" color="white">
                {isSignup ? 'Begin Your Journey' : 'Return to Your Path'}
              </Heading>
              <Input
                required
                placeholder="you@luminanova.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                bg="rgba(0, 0, 0, 0.6)"
                color="white"
                border="1px solid"
                borderColor="purple.500"
                _hover={{ borderColor: "purple.400" }}
                _focus={{ borderColor: "purple.300", boxShadow: "0 0 0 1px #805AD5" }}
              />
              <Input
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                bg="rgba(0, 0, 0, 0.6)"
                color="white"
                border="1px solid"
                borderColor="purple.500"
                _hover={{ borderColor: "purple.400" }}
                _focus={{ borderColor: "purple.300", boxShadow: "0 0 0 1px #805AD5" }}
              />
              <Button
                type="submit"
                w="full"
                colorScheme="purple"
                size="lg"
                isLoading={isLoading}
                loadingText="Opening Portal..."
                bg="purple.500"
                _hover={{ bg: "purple.600" }}
              >
                {isSignup ? 'Begin Your Journey' : 'Enter Portal'}
              </Button>
              <Text color="gray.300">
                {isSignup ? 'Already on the path?' : 'New to Lumina Nova?'}{' '}
                <Button
                  variant="link"
                  color="purple.300"
                  onClick={() => setIsSignup(!isSignup)}
                  _hover={{ color: "purple.200" }}
                >
                  {isSignup ? 'Return' : 'Begin Your Journey'}
                </Button>
              </Text>
            </VStack>
          </form>
        </Box>

        <Box maxW="600px" textAlign="center" mt={8}>
          <Text color="gray.400">
            Through sacred scrolls, intelligent resonance, and harmonic design,
            we offer a portal into the possible.
          </Text>
        </Box>
      </VStack>
    </Container>
  );
}




