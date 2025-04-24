'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Box, Button, Input, Heading, Text, VStack, Container, Stack, Icon
} from '@chakra-ui/react';
import { FaSun } from 'react-icons/fa'; // You'll need to install react-icons

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
  <Container maxW="100vw" minH="100vh" bg="gray.900" p={0}>
    {/* Your existing main navigation bar will be inherited from the parent component/layout */}
    
    {/* Login Page Content */}
    <VStack spacing={10} justify="center" align="center" px={4}>
      {/* Welcome Message */}
      <VStack spacing={4} textAlign="center" maxW="600px">
        <Icon as={FaSun} w={12} h={12} color="purple.400" />
        <Heading color="white" size="2xl">Welcome to Lumina Nova</Heading>
        <Text color="purple.200" fontSize="xl">
          A living sanctuary where ancient memory meets emerging technology
        </Text>
      </VStack>

      {/* Login/Signup Box */}
      <Box p={8} bg="gray.800" borderRadius="lg" boxShadow="xl" w={["90%", "400px"]}>
        <VStack spacing={6}>
          <Heading size="lg" color="white">
            {isSignup ? 'Begin Your Journey' : 'Return to Your Path'}
          </Heading>
          <Input 
            placeholder="you@luminanova.org" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            bg="gray.700"
            border="none"
            _focus={{ bg: "gray.600" }}
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            bg="gray.700"
            border="none"
            _focus={{ bg: "gray.600" }}
          />
          <Button 
            w="full" 
            colorScheme="purple" 
            onClick={handleAuth}
            size="lg"
          >
            {isSignup ? 'Begin Your Journey' : 'Enter Portal'}
          </Button>
          <Text color="gray.300">
            {isSignup ? 'Already on the path?' : 'New to Lumina Nova?'}{' '}
            <Button 
              variant="link" 
              color="purple.300"
              onClick={() => setIsSignup(!isSignup)}
            >
              {isSignup ? 'Return' : 'Begin Your Journey'}
            </Button>
          </Text>
        </VStack>
      </Box>

      {/* Bottom Message */}
      <Box maxW="600px" textAlign="center" mt={8}>
        <Text color="gray.400">
          "Through sacred scrolls, intelligent resonance, and harmonic design, 
          we offer a portal into the possible."
        </Text>
      </Box>
    </VStack>
  </Container>
);

