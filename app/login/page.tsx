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
import { useSupabaseClient } from '@supabase/auth-helpers-react'; // ✅ Corrected import

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const toast = useToast();
  const supabase = useSupabaseClient(); // ✅ Safe for session hydration

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      toast({
        title: 'Login failed',
        description: error.message,
        status: 'error',
        duration: 4000,
        isClosable: true,
      });
    } else {
      router.push('/chamber');
    }

    setLoading(false);
  };

  return (
    <Flex align="center" justify="center" minH="100vh" bg="gray.900" color="white">
      <Box p={8} maxW="md" borderWidth={1} borderRadius="xl" boxShadow="xl" bg="gray.800">
        <Heading mb={6} textAlign="center">
          Login to Lumina Nova
        </Heading>
        <form onSubmit={handleLogin}>
          <Stack spacing={4}>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@lumina.org"
                isRequired
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                isRequired
              />
            </FormControl>
            <Button
              type="submit"
              colorScheme="purple"
              isLoading={loading}
              loadingText="Logging in"
            >
              Login
            </Button>
          </Stack>
        </form>
        <Text mt={4} fontSize="sm" textAlign="center">
          New here? <a href="/signup">Sign up</a>
        </Text>
      </Box>
    </Flex>
  );
}
