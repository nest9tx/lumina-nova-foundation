'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase/client';
import {
  Button,
  Container,
  Heading,
  Input,
  Text,
  VStack,
} from '@chakra-ui/react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSignup, setIsSignup] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setMessage(null);

    try {
      if (isSignup) {
        const result = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: 'https://www.luminanova.org/chamber',
          },
        });

        console.log('🔍 Signup result:', result);

        if (result.error) throw result.error;

        setMessage('✅ Success! Check your email to confirm your signup.');
      } else {
        const result = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        console.log('🔍 Login result:', result);

        if (result.error) throw result.error;

        router.push('/chamber');
      }
    } catch (err) {
      let errorMessage = 'An unknown error occurred.';
      let errorStatus: number | undefined;
      let errorDetails: string | undefined;

      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (typeof err === 'object' && err !== null) {
        errorMessage = (err as { message?: string }).message ?? errorMessage;
        errorStatus = (err as { status?: number }).status;
        errorDetails = (err as { error_description?: string; msg?: string }).error_description ?? (err as { msg?: string }).msg;
      }

      console.error('❌ Auth error full object:', err);
      console.error('❌ Auth error message:', errorMessage);
      if (errorStatus) console.error('❌ Auth error status:', errorStatus);
      if (errorDetails) console.error('❌ Auth error details:', errorDetails);

      setError(errorMessage);
    }
  };

  return (
    <Container maxW="md" py={10}>
      <VStack spacing={4} align="stretch">
        <Heading>{isSignup ? 'New Seeker' : 'Login'}</Heading>

        {error && <Text color="red.500">{error}</Text>}
        {message && <Text color="green.500">{message}</Text>}

        <form onSubmit={handleSubmit}>
          <VStack spacing={4}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              isRequired
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              isRequired
            />
            <Button type="submit" colorScheme="purple" w="full">
              {isSignup ? 'Sign Up' : 'Login'}
            </Button>
            <Button
              variant="link"
              onClick={() => setIsSignup(!isSignup)}
              color="purple.500"
            >
              {isSignup
                ? 'Already have an account? Login'
                : 'New here? Sign up'}
            </Button>
          </VStack>
        </form>
      </VStack>
    </Container>
  );
}
