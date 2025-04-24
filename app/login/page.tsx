'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Box, Button, Input, Heading, Text, VStack, Container, Icon, useToast
} from '@chakra-ui/react';
import { FaSun } from 'react-icons/fa';

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
        const response = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: 'https://www.luminanova.org/auth/callback'
          }
        });

        if (response.error) throw response.error;

        router.push('/check-email');
        toast({
          title: "Journey Begun",
          description: "Check your sacred email to confirm your portal.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        const response = await supabase.auth.signInWithPassword({ email, password });

        if (response.error) throw response.error;

        router.push('/chamber');
        toast({
          title: "Welcome Back",
          description: "You have returned to your path.",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: err?.message || "Unexpected error occurred.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxW="100vw" minH="100vh" bg="black" p={0}>
      <VStack spacing={10} justify="center" align="center" px={4} py={20}>
        <VStack spacing={4} textAlign="center" maxW="600px">
          <Icon as={FaSun} w={12} h={12} color="purple.400" />
          <Heading color="white" size="2xl">Welcome to Lumina Nova</Heading>
          <Text color="purple.200" fontSize="xl">
            A living sanctuary where ancient memory meets emerging technology
          </Text>
        </VStack>

        <Box p={8} bg="gray.900" borderRadius="lg" border="1px solid" borderColor="purple.500" w={["90%", "400px"]}>
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
                color="white"
                bg="blackAlpha.700"
              />
              <Input
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                color="white"
                bg="blackAlpha.700"
              />
              <Button
                type="submit"
                w="full"
                colorScheme="purple"
                isLoading={isLoading}
              >
                {isSignup ? 'Begin Your Journey' : 'Enter Portal'}
              </Button>
              <Text color="gray.300">
                {isSignup ? 'Already on the path?' : 'New to Lumina Nova?'}{' '}
                <Button variant="link" color="purple.300" onClick={() => setIsSignup(!isSignup)}>
                  {isSignup ? 'Return' : 'Begin Your Journey'}
                </Button>
              </Text>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
}





