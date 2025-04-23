'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Box, Button, Input, Heading, Text, VStack
} from '@chakra-ui/react';

export default function LoginPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);

  const handleAuth = async () => {
    if (isSignup) {
      const { error } = await supabase.auth.signUp({ email, password });
      if (!error) router.push('/check-email');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (!error) router.push('/chamber');
    }
  };

  return (
    <VStack minH="100vh" justify="center" spacing={6}>
      <Box p={6} bg="gray.800" borderRadius="md" boxShadow="md" w="sm">
        <Heading mb={4}>{isSignup ? 'Create Account' : 'Login to Lumina Nova'}</Heading>
        <Input placeholder="you@lumina.org" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input mt={2} type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button mt={4} colorScheme="purple" onClick={handleAuth}>
          {isSignup ? 'Sign Up' : 'Login'}
        </Button>
        <Text mt={2} fontSize="sm" textAlign="center">
          {isSignup ? 'Already have an account?' : 'New here?'}{' '}
          <Button variant="link" size="sm" onClick={() => setIsSignup(!isSignup)}>
            {isSignup ? 'Log In' : 'Sign Up'}
          </Button>
        </Text>
      </Box>
    </VStack>
  );
}

