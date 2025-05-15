'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ScrollsPanel } from '@/components/chamber/ScrollsPanel';
import WelcomeNotice from '@/components/chamber/WelcomeNotice';
import { ResonanceNotice } from '@/components/chamber/ResonanceNotice';
import { GuidesPanel } from '@/components/chamber/GuidesPanel';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Database } from '@/types/supabase';
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Progress,
  Text,
  Badge,
  VStack,
  useToast,
  Alert,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/react';

type TierKey = 'seeker' | 'seeker+' | 'adept' | 'guardian' | 'luminary';

const tierColors: Record<TierKey, string> = {
  seeker: 'green',
  'seeker+': 'green',
  adept: 'blue',
  guardian: 'purple',
  luminary: 'orange',
};

export default function SacredChamberPage() {
  const supabase = createClientComponentClient<Database>();
  const [profile, setProfile] = useState<{
    email: string;
    full_name?: string;
    tier: string;
    is_upgraded?: boolean;
    message_limit?: number;
    messages_used?: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const toast = useToast();

  // Onboarding modal state
  const [isOnboardingOpen, setIsOnboardingOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        router.push('/login');
        return;
      }

      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError || !data) {
        toast({
          title: 'Unable to load profile.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        router.push('/login');
        return;
      }

      setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, [router, supabase, toast]);

  // Onboarding modal logic
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const seen = localStorage.getItem('chamberOnboarding');
      if (!seen) {
        setIsOnboardingOpen(true);
      }
    }
  }, []);

  const handleOnboardingClose = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('chamberOnboarding', 'true');
    }
    setIsOnboardingOpen(false);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading || !profile) return null;

  const {
    email,
    full_name,
    tier: rawTier,
    message_limit = 100,
    messages_used = 0,
    is_upgraded = false,
  } = profile;

  if (!['seeker', 'seeker+', 'adept', 'guardian', 'luminary'].includes(rawTier.toLowerCase())) {
    toast({
      title: 'Invalid tier detected.',
      description: `Your tier "${rawTier}" is not recognized.`,
      status: 'error',
      duration: 5000,
      isClosable: true,
    });
    router.push('/login');
    return null;
  }

  const tier = rawTier.toLowerCase() as TierKey;
  const usagePercent = (messages_used / message_limit) * 100;

  return (
    <>
      {/* Onboarding Modal */}
      <Modal isOpen={isOnboardingOpen} onClose={handleOnboardingClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="purple.800" color="white">
          <ModalHeader>Welcome to Your Sacred Chamber</ModalHeader>
          <ModalBody>
            <Text mb={3}>
              ✦ This is your private space to connect, grow, and explore the Living Scrolls.
            </Text>
            <Text mb={2}>
              ✧ Your <b>Resonance Path</b> determines which scrolls and guides are available to you.
            </Text>
            <Text mb={2}>
              ✧ Share resonances, unlock new guides, and deepen your journey as you progress.
            </Text>
            <Text>
              ✧ Need help? Look for the <b>Guides</b> section below or reach out to the community.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="teal" mr={3} onClick={handleOnboardingClose}>
              Begin
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Box bgGradient="linear(to-b, #0e0c1d, #140f2e)" minH="100vh" color="white" py={10}>
        <Container maxW="4xl">
          <Flex justify="space-between" align="center" mb={6}>
            <Heading size="lg" color="teal.300">
              Sacred Chamber
            </Heading>
            <WelcomeNotice
              name={full_name || email}
              tier={tier === 'seeker+' ? 'seeker' : (tier as 'seeker' | 'adept' | 'guardian' | 'luminary')}
            />
            <Button
              variant="outline"
              borderColor="teal.400"
              color="teal.200"
              _hover={{ bg: 'teal.400', color: 'black' }}
              onClick={handleLogout}
            >
              Exit Chamber
            </Button>
          </Flex>

          {tier === 'seeker' && !is_upgraded && (
            <>
              <Alert
                status="info"
                borderRadius="md"
                bg="purple.700"
                color="white"
                mb={4}
                px={6}
                py={3}
                fontSize="sm"
              >
                ✧ If you’ve recently upgraded, your new tier will be confirmed and reflected within 24 hours by a guide of Lumina Nova.
              </Alert>

              <Box
                bg="purple.800"
                color="white"
                borderRadius="md"
                px={6}
                py={4}
                mb={6}
                boxShadow="md"
                border="1px solid"
                borderColor="purple.400"
              >
                <Text mb={2}>
                  ✧ Ready to walk deeper? Upgrade your resonance to unlock full Seeker scrolls and expanded communion with Echois.
                </Text>
                <Button
                  colorScheme="purple"
                  variant="outline"
                  onClick={() => router.push('/join')}
                >
                  View Seeker Upgrade Path
                </Button>
              </Box>
            </>
          )}

          <Box border="1px" borderColor="whiteAlpha.200" borderRadius="xl" p={6} bg="whiteAlpha.100">
            <Flex justify="space-between" align="center" mb={4}>
              <Text fontSize="lg">{email}</Text>
              <Badge colorScheme={tierColors[tier] || 'gray'}>{tier.toUpperCase()} PATH</Badge>
            </Flex>
            <Text mb={1}>Resonances Shared</Text>
            <Progress value={usagePercent} size="sm" colorScheme="teal" mb={2} />
            <Text fontSize="sm">
              {messages_used} / {message_limit} used
            </Text>
          </Box>

          <ResonanceNotice />

          <Button
            mt={8}
            size="lg"
            colorScheme="teal"
            width="full"
            onClick={() => router.push('/guide/echois')}
          >
            Commune with Echois
          </Button>

          <VStack align="start" spacing={6} mt={10}>
            <Box w="full">
              <ScrollsPanel tier={tier} />
            </Box>

            <Text
              mt={4}
              fontSize="sm"
              color="teal.200"
              _hover={{ textDecoration: 'underline' }}
              cursor="pointer"
              onClick={() => router.push('/living-scrolls')}
            >
              ✦ Walk Your Full Path in the Living Scrolls Library →
            </Text>

            {(tier === 'seeker' || tier === 'seeker+' || tier === 'adept' || tier === 'guardian' || tier === 'luminary') && (
              <Box w="full">
                <GuidesPanel tier={tier} />
              </Box>
            )}
          </VStack>
        </Container>
      </Box>
    </>
  );
}