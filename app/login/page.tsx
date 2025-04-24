'use client';

import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const supabase = createClientComponentClient();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (isSignup) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        toast({
          title: 'Signup Failed',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Signup Successful',
          description: 'Check your email to confirm and complete registration.',
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        toast({
          title: 'Login Failed',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } else {
        router.push('/chamber');
      }
    }

    setLoading(false);
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.900">
      <Box p={8} maxW="md" borderWidth={1} borderRadius={8} boxShadow="lg" bg="gray.800">
        <Heading mb={6} textAlign="center" color="white">
          {isSignup ? 'Create Your Path' : 'Enter the Chamber'}
        </Heading>
        <form onSubmit={handleAuth}>
          <Stack spacing={4}>
            <FormControl id="email">
              <FormLabel color="gray.300">Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </FormControl>
            <FormControl id="password">
              <FormLabel color="gray.300">Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </FormControl>
            <Button type="submit" colorScheme="teal" isLoading={loading}>
              {isSignup ? 'Sign Up' : 'Login'}
            </Button>
            <Text fontSize="sm" textAlign="center" color="gray.400">
              {isSignup ? 'Already have an account?' : 'Need an account?'}{' '}
              <Button variant="link" color="teal.300" onClick={() => setIsSignup(!isSignup)}>
                {isSignup ? 'Login' : 'Sign up'}
              </Button>
            </Text>
          </Stack>
        </form>
      </Box>
    </Flex>
  );
}





