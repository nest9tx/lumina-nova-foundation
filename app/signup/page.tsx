'use client';

import {
  Box,
  Button,
  FormControl,
  Heading,
  Input,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';

export default function SignupPage() {
  const supabase = createClientComponentClient<Database>();
  const router = useRouter();
  const toast = useToast();

  // Default to signup mode
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoading(false);

    if (error) {
      toast({ title: 'Login failed', description: error.message, status: 'error' });
    } else {
      router.push('/chamber');
    }
  };

  const handleSignup = async () => {
  setLoading(true);
  const response = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: 'https://www.luminanova.org/guide/start'
    }
  });

  if (response.error) {
    toast({ title: 'Signup failed', description: response.error.message, status: 'error' });
    setLoading(false);
    return;
  }

  toast({
    title: 'Signup successful',
    description: 'Check your email to confirm your account.',
    status: 'success',
  });
  setLoading(false);
};
  return (
    <Box
      minH="100vh"
      bg="#0a0a12"
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
    >
      <Box textAlign="center" mb={8}>
        <Box
          as="span"
          display="inline-block"
          mb={4}
          fontSize="3xl"
          color="purple.300"
        >
          {/* Feather icon or similar */}
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24">
            <path fill="#a78bfa" d="M19.5 2.5c-2.5 0-7.5 2-11 8.5S2.5 21.5 2.5 21.5s7.5-1 13-6.5 6.5-10 6.5-10-2-2-2-2zm-2.5 7.5c-2.5 2.5-7.5 7.5-7.5 7.5" />
          </svg>
        </Box>
        <Heading
          as="h1"
          size="2xl"
          fontWeight="bold"
          color="white"
          mb={2}
        >
          {isSignup ? 'Begin Your Journey' : 'Enter the Chamber'}
        </Heading>
        <Text color="purple.200" fontSize="lg">
          {isSignup
            ? 'Open your seeker portal and receive the first echoes of Lumina Nova'
            : 'Return to your seeker portal and continue your journey'}
        </Text>
        
<Text color="purple.400" fontSize="sm" mt={2} textAlign="center">
  Not sure where to begin? Start with the <a href="/guide/start" style={{ textDecoration: 'underline' }}>Welcome Guide</a> to walk in harmony.
</Text>

      </Box>
      <Box
        bg="#181828"
        borderRadius="lg"
        boxShadow="0 0 0 1.5px #a78bfa"
        px={8}
        py={8}
        minW={["90vw", "400px"]}
        maxW="400px"
      >
        <VStack spacing={4}>
          <FormControl id="email" isRequired>
            <Input
              type="email"
              placeholder="you@luminanova.org"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              bg="#11111a"
              color="white"
              borderColor="#a78bfa"
              _placeholder={{ color: "#a78bfa" }}
              _focus={{ borderColor: "#a78bfa", boxShadow: "0 0 0 1.5px #a78bfa" }}
            />
          </FormControl>
          <FormControl id="password" isRequired>
            <Input
              type="password"
              placeholder="Create a sacred key"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              bg="#11111a"
              color="white"
              borderColor="#a78bfa"
              _placeholder={{ color: "#a78bfa" }}
              _focus={{ borderColor: "#a78bfa", boxShadow: "0 0 0 1.5px #a78bfa" }}
            />
          </FormControl>
          <Button
            bg="#a78bfa"
            color="white"
            size="lg"
            w="full"
            mt={2}
            _hover={{ bg: "#7c3aed" }}
            onClick={isSignup ? handleSignup : handleLogin}
            isLoading={loading}
            fontWeight="bold"
            fontSize="lg"
          >
            {isSignup ? 'Enter as a Seeker' : 'Return to Chamber'}
          </Button>
        </VStack>
        <Text mt={6} textAlign="center" color="purple.200">
          {isSignup ? (
            <>
              Already have a portal?{' '}
              <Button
                variant="link"
                color="#a78bfa"
                fontWeight="bold"
                onClick={() => setIsSignup(false)}
              >
                Return to Chamber
              </Button>
            </>
          ) : (
            <>
              Need a portal?{' '}
              <Button
                variant="link"
                color="#a78bfa"
                fontWeight="bold"
                onClick={() => setIsSignup(true)}
              >
                Begin Your Journey
              </Button>
            </>
          )}
        </Text>
      </Box>
    </Box>
  );
}