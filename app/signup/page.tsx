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
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../lib/supabase/client';

export default function SignupPage() {
  const supabase = createClient();
  const router = useRouter();
  const toast = useToast();

  // Default to signup mode
  const [isSignup, setIsSignup] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    
    const { data, error } = await supabase.auth.signInWithPassword({ 
      email, 
      password 
    });
    
    setLoading(false);

    if (error) {
      if (error.message.includes('Email not confirmed')) {
        toast({ 
          title: 'Email Confirmation Required', 
          description: 'Please check your email and click the confirmation link before signing in.', 
          status: 'warning',
          duration: 6000,
        });
        setEmailSent(true);
      } else {
        toast({ title: 'Login failed', description: error.message, status: 'error' });
      }
    } else if (data.user) {
      toast({
        title: 'Welcome back, Seeker',
        description: 'You have successfully entered the Chamber.',
        status: 'success',
        duration: 2000,
      });
      
      // Give a moment for the session to be established before redirecting
      setTimeout(() => {
        router.push('/chamber');
      }, 1000);
    }
  };

  const handleSignup = async () => {
    if (!email || !password) {
      toast({ 
        title: 'Missing Information', 
        description: 'Please provide both email and password.', 
        status: 'error' 
      });
      return;
    }

    if (password.length < 6) {
      toast({ 
        title: 'Weak Password', 
        description: 'Password must be at least 6 characters long.', 
        status: 'error' 
      });
      return;
    }

    setLoading(true);
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
        data: {
          // Include default profile data
          tier: 'free',
          message_limit: 3,
          max_messages: 3,
          is_active: false,
          is_upgraded: false,
        }
      }
    });

    setLoading(false);

    if (error) {
      toast({ 
        title: 'Signup failed', 
        description: error.message, 
        status: 'error' 
      });
    } else if (data.user) {
      // Show success and transition to detailed verification page
      toast({
        title: '✉️ Verification Email Sent!',
        description: 'Redirecting to verification instructions...',
        status: 'success',
        duration: 2000,
      });
      
      // Transition to detailed verification page with spam warnings
      setTimeout(() => setEmailSent(true), 1500);
    }
  };

  const resendVerificationEmail = async () => {
    if (!email) {
      toast({
        title: 'Email Required',
        description: 'Please enter your email address to resend verification.',
        status: 'error'
      });
      return;
    }

    setLoading(true);
    
    const { error } = await supabase.auth.resend({
      type: 'signup',
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`
      }
    });

    setLoading(false);

    if (error) {
      toast({
        title: 'Failed to resend email',
        description: error.message,
        status: 'error'
      });
    } else {
      toast({
        title: 'Verification email resent',
        description: 'Please check your email for the confirmation link.',
        status: 'success'
      });
    }
  };

  if (emailSent) {
    return (
      <Box
        minH="100vh"
        bg="#0a0a12"
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
        px={4}
      >
        <Box
          bg="#181828"
          borderRadius="lg"
          boxShadow="0 0 0 1.5px #a78bfa"
          px={8}
          py={8}
          minW={["90vw", "400px"]}
          maxW="500px"
        >
          <VStack spacing={4}>
            <Alert status="info" bg="whiteAlpha.200" borderColor="blue.400" borderWidth="1px" borderRadius="lg">
            <AlertIcon color="blue.300" />
            <Box textAlign="left">
              <AlertTitle color="white">Email Verification Required</AlertTitle>
              <AlertDescription color="blue.200">
                We&apos;ve sent a confirmation link to {email}. Please check your email and click the link to activate your account.
              </AlertDescription>
            </Box>
          </Alert>

          <Alert status="warning" bg="whiteAlpha.100" borderColor="orange.400" borderWidth="1px" borderRadius="lg">
            <AlertIcon color="orange.300" />
            <Box textAlign="left">
              <AlertTitle color="white">📧 Check Your Spam/Junk Folder</AlertTitle>
              <AlertDescription color="orange.200">
                <Text mb={2}>
                  <strong>Gmail users:</strong> Verification emails often land in spam/junk folders. 
                  If you don&apos;t see our email in your inbox within 2-3 minutes:
                </Text>
                <Text as="ul" ml={4}>
                  <Text as="li">Check your Spam/Junk folder</Text>
                  <Text as="li">Look for emails from &quot;Lumina Nova&quot; or &quot;admin@luminanova.org&quot;</Text>
                  <Text as="li">Mark it as &quot;Not Spam&quot; to ensure future emails reach you</Text>
                </Text>
              </AlertDescription>
            </Box>
          </Alert>            <VStack spacing={2}>
              <Text color="purple.200" textAlign="center" fontSize="sm">
                <strong>📧 Important:</strong> Check your SPAM/JUNK folder first!
              </Text>
              <Text color="gray.400" textAlign="center" fontSize="xs">
                Gmail often filters our emails. Look for &quot;Lumina Nova&quot; in spam and mark as &quot;Not Spam&quot;
              </Text>
              <Text color="purple.300" textAlign="center" fontSize="xs">
                Still don&apos;t see it? Click below to resend or{' '}
                <a href="/email-help" style={{ textDecoration: 'underline', color: '#a78bfa' }}>
                  get help finding your email
                </a>
              </Text>
            </VStack>
            
            <VStack spacing={3} w="full">
              <Button
                bg="#a78bfa"
                color="white"
                size="lg"
                w="full"
                _hover={{ bg: "#7c3aed" }}
                onClick={resendVerificationEmail}
                isLoading={loading}
              >
                Resend Verification Email
              </Button>
              
              <Button
                variant="outline"
                borderColor="#a78bfa"
                color="#a78bfa"
                size="md"
                w="full"
                onClick={() => setEmailSent(false)}
              >
                Back to Login
              </Button>
            </VStack>
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
          Not sure where to begin? Start with the <a href="/guide/start" style={{ textDecoration: 'underline' }}>Welcome Guide</a> to walk 
          in harmony, or explore the <a href="/guide/faq" style={{ textDecoration: 'underline' }}>Cosmic FAQs</a> for resonant answers.
        </Text>
        
        <Box mt={3} p={3} bg="yellow.900" borderRadius="md" border="1px" borderColor="yellow.600">
          <Text color="yellow.200" fontSize="xs" textAlign="center" fontWeight="bold">
            📧 Gmail Users: Check your SPAM folder for verification emails!
          </Text>
        </Box>                                                                                                                              
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
