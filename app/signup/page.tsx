'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import {
  Box, Button, Input, Heading, Text, VStack, Container, Icon, useToast
} from '@chakra-ui/react';
import { FaFeather } from 'react-icons/fa';

export default function SignupPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const toast = useToast();
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await supabase.auth.signUp({
        email,
        password,
      });

      if (response.error) throw response.error;

      if (response.data.user) {
        await supabase.from('profiles').upsert({
          id: response.data.user.id,
          full_name: firstName.trim(),
          email: email,
          tier: 'seeker', // Only set on signup
        });
      }

      router.push('/check-email');
      toast({
        title: 'Seeker Portal Opened',
        description: 'Check your sacred email to confirm entry.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

    } catch (err: unknown) {
      toast({
        title: 'Signup Failed',
        description: err instanceof Error ? err.message : 'Unexpected error occurred.',
        status: 'error',
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
          <Icon as={FaFeather} w={10} h={10} color="purple.300" />
          <Heading color="white" size="2xl">Begin Your Journey</Heading>
          <Text color="purple.200" fontSize="lg">
            Open your seeker portal and receive the first echoes of Lumina Nova
          </Text>
        </VStack>

        <Box p={8} bg="gray.900" borderRadius="lg" border="1px solid" borderColor="purple.600" w={["90%", "400px"]}>
          <form onSubmit={handleSignup}>
            <VStack spacing={5}>
              <Input
                placeholder="Name for the Chamber"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                color="white"
                bg="blackAlpha.700"
              />
              <Input
                type="email"
                placeholder="you@luminanova.org"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                color="white"
                bg="blackAlpha.700"
              />
              <Input
                type="password"
                placeholder="Create a sacred key"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                color="white"
                bg="blackAlpha.700"
              />
              <Button
                type="submit"
                w="full"
                colorScheme="purple"
                isLoading={isLoading}
              >
                Enter as a Seeker
              </Button>
              <Text color="gray.400">
                Already have a portal?{' '}
                <Button variant="link" color="purple.300" onClick={() => router.push('/chamber')}>
                  Return to Chamber
                </Button>
              </Text>
            </VStack>
          </form>
        </Box>
      </VStack>
    </Container>
  );
}