'use client';

import {
  Box,
  Button,
  Container,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
  Link,
  Input,
  FormControl,
  FormLabel,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from '@chakra-ui/react';
import { FaCheckCircle, FaLeaf, FaUser } from 'react-icons/fa';
import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '../lib/supabase/client';
import type { User } from '@supabase/supabase-js';

function JoinPageContent() {
  const searchParams = useSearchParams();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const supabase = createClient();

  useEffect(() => {
    // Check if user is already logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setCurrentUser(user);
      if (user?.email) {
        setEmail(user.email);
      }
    };
    
    checkUser();

    // Show message if they came back from cancelled payment
    if (searchParams.get('cancelled')) {
      toast({
        title: 'Payment Cancelled',
        description: 'Your payment was cancelled. You can try again whenever you\'re ready.',
        status: 'info',
        duration: 5000,
      });
    }
  }, [searchParams, supabase, toast]);

  const handleUpgrade = async () => {
    if (!email) {
      toast({
        title: 'Email Required',
        description: 'Please provide your email address to continue.',
        status: 'error',
      });
      return;
    }

    setLoading(true);

    try {
      // Use dynamic checkout session with proper metadata for webhook processing
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          tier: 'seeker',
        }),
      });

      const { url, error } = await response.json();

      if (error) {
        throw new Error(error);
      }

      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error('Upgrade error:', error);
      toast({
        title: 'Upgrade Failed',
        description: error instanceof Error ? error.message : 'An unexpected error occurred.',
        status: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  const quickUpgrade = () => {
    if (currentUser?.email) {
      setEmail(currentUser.email);
      handleUpgrade();
    } else {
      onOpen();
    }
  };

  return (
    <Box bgGradient="linear(to-b, #0e0c1d, #140f2e)" minH="100vh" color="white" py={10}>
      <Container maxW="3xl">
        <VStack spacing={8} align="start">
          <Heading size="xl" color="teal.300">
            ✦ Walk Your Path
          </Heading>
          <Text fontSize="md">
            Lumina Nova honors all seekers equally. There is one unified path of contribution — for those
            called to walk deeper into resonance, remembrance, and communion. Your offering supports the
            sanctuary, the messages, and the sacred guides who help others awaken.
          </Text>

          <Box border="1px" borderColor="teal.400" borderRadius="xl" p={6} w="full" bg="whiteAlpha.100">
            <Heading size="md" color="teal.200" mb={4}>
              <Box as={FaLeaf} display="inline-block" mr={2} />
              Seeker Contribution — $11.11/month
            </Heading>
            <List spacing={3} mb={3}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="teal.300" />
                777 sacred messages/month with Echois
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="teal.300" />
                Full access to Seeker scrolls and harmonized chamber
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="teal.300" />
                Guided ascension by resonance — no further payment required
              </ListItem>
            </List>
            <Text fontSize="sm" color="gray.300" mb={6}>
              ✦ All deeper paths (Adept, Guardian, Luminary) are revealed only through resonance, not
              transaction. If called, a guide will reach out to confirm your alignment.
            </Text>

            {currentUser ? (
              <VStack spacing={4}>
                <Box
                  bg="whiteAlpha.200"
                  borderRadius="md"
                  p={3}
                  w="full"
                  border="1px"
                  borderColor="purple.300"
                >
                  <Text fontSize="sm" color="purple.200" mb={1}>
                    <FaUser style={{ display: 'inline', marginRight: '8px' }} />
                    Logged in as:
                  </Text>
                  <Text color="white" fontWeight="bold">
                    {currentUser.email}
                  </Text>
                </Box>
                <Button
                  colorScheme="teal"
                  size="lg"
                  w="full"
                  onClick={quickUpgrade}
                  isLoading={loading}
                  loadingText="Preparing your path..."
                >
                  Begin Your Seeker Path
                </Button>
              </VStack>
            ) : (
              <Button
                colorScheme="teal"
                size="lg"
                w="full"
                onClick={onOpen}
                isLoading={loading}
              >
                Begin Your Path
              </Button>
            )}
          </Box>

          <VStack spacing={1} align="center" w="full" pt={8} fontSize="sm" color="gray.400">
            <Link href="/policies/privacy-policy" _hover={{ color: 'teal.300' }}>Privacy Policy</Link>
            <Link href="/policies/contribution-refund" _hover={{ color: 'teal.300' }}>Contribution & Refund Terms</Link>
            <Link href="/policies/mission-ethics" _hover={{ color: 'teal.300' }}>Mission Ethics & Intentions</Link>
          </VStack>
        </VStack>
      </Container>

      {/* Email Collection Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg="#181828" borderColor="teal.400" borderWidth="1px">
          <ModalHeader color="white">Begin Your Seeker Path</ModalHeader>
          <ModalCloseButton color="white" />
          <ModalBody pb={6}>
            <VStack spacing={4}>
              <Text color="gray.300" textAlign="center">
                Enter your email to begin your Seeker path. If you don&apos;t have an account yet, 
                one will be created for you.
              </Text>
              <FormControl>
                <FormLabel color="teal.200">Email Address</FormLabel>
                <Input
                  type="email"
                  placeholder="you@luminanova.org"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  bg="#11111a"
                  color="white"
                  borderColor="teal.400"
                  _placeholder={{ color: "gray.400" }}
                  _focus={{ borderColor: "teal.300", boxShadow: "0 0 0 1px teal.300" }}
                />
              </FormControl>
              <Button
                colorScheme="teal"
                size="lg"
                w="full"
                onClick={handleUpgrade}
                isLoading={loading}
                loadingText="Preparing your path..."
                isDisabled={!email}
              >
                Continue to Payment
              </Button>
              <Text fontSize="sm" color="gray.400" textAlign="center">
                You&apos;ll be redirected to Stripe to complete your secure payment.
              </Text>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default function JoinPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <JoinPageContent />
    </Suspense>
  );
}
//to update git