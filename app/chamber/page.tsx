'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ScrollsPanel } from '../../components/chamber/ScrollsPanel';
import WelcomeNotice from '../../components/chamber/WelcomeNotice';
import { ResonanceNotice } from '../../components/chamber/ResonanceNotice';
import { GuidesPanel } from '../../components/chamber/GuidesPanel';
import { createClient } from '../../utils/supabase/client';
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
} from '@chakra-ui/react';

const tierColors = {
  seeker: 'green',
  adept: 'blue',
  guardian: 'purple',
  luminary: 'orange',
};



export default function SacredChamberPage() {
  const supabase = createClient();
  const [profile, setProfile] = useState<{
    email: string;
    full_name?: string;
    tier: keyof typeof tierColors;
    is_upgraded?: boolean;
    message_limit?: number;
    message_count?: number;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const toast = useToast();

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

      // Debug logging to see current profile state
      console.log('Current profile data:', data);

      setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, [router, supabase, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  const refreshProfile = async () => {
    setLoading(true);
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!profileError && data) {
        console.log('Refreshed profile data:', data);
        setProfile(data);
        toast({
          title: 'Profile refreshed',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
      }
    }
    setLoading(false);
  };

    const testUpgrade = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/debug-session', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.error) {
        toast({
          title: 'Upgrade test failed',
          description: data.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Test upgrade successful',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        // Refresh profile after upgrade
        await refreshProfile();
      }
    } catch (err) {
      console.error('Test upgrade error:', err);
      toast({
        title: 'Test failed',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const simulateWebhook = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-webhook', {
        method: 'POST',
      });
      const data = await response.json();
      if (data.error) {
        toast({
          title: 'Webhook simulation failed',
          description: data.error,
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: 'Webhook simulation successful',
          description: 'Profile upgraded via webhook simulation',
          status: 'success',
          duration: 2000,
          isClosable: true,
        });
        // Refresh profile after webhook
        await refreshProfile();
      }
    } catch (err) {
      console.error('Webhook simulation error:', err);
      toast({
        title: 'Simulation failed',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading || !profile) return null;

  const {
    email,
    full_name,
    tier: rawTier,
    message_limit = 100,
    message_count = 0,
    is_upgraded = false,
  } = profile;

  const tier = rawTier.toLowerCase() as 'seeker' | 'adept' | 'guardian' | 'luminary';
  const usagePercent = (message_count / message_limit) * 100;

  return (
    <Box bgGradient="linear(to-b, #0e0c1d, #140f2e)" minH="100vh" color="white" py={10}>
      <Container maxW="4xl">
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg" color="teal.300">
            Sacred Chamber
          </Heading>
          <WelcomeNotice name={full_name || email} tier={tier} />
          <Flex gap={2}>
            <Button
              size="sm"
              colorScheme="purple"
              variant="ghost"
              onClick={refreshProfile}
              isLoading={loading}
            >
              Refresh Status
            </Button>
            <Button
              size="sm"
              colorScheme="green"
              variant="ghost"
              onClick={testUpgrade}
            >
              Test Upgrade
            </Button>
            <Button
              size="sm"
              colorScheme="orange"
              variant="ghost"
              onClick={simulateWebhook}
              isLoading={loading}
            >
              Simulate Webhook
            </Button>
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
        </Flex>
<Box
  bg="pink.100"
  color="pink.900"
  borderRadius="md"
  px={4}
  py={3}
  mb={6}
  textAlign="center"
  fontWeight="semibold"
  boxShadow="sm"
  cursor="pointer"
  _hover={{ bg: "pink.200" }}
  onClick={() => router.push('/guide/start')}
>
  🜂 New Here? <u>Start Your Path →</u>
</Box>

        {/* ✧ Seeker-only upgrade message */}
        {message_limit <= 3 && !is_upgraded && (
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
            <Badge colorScheme={tierColors[tier]}>{tier.toUpperCase()} PATH</Badge>
          </Flex>
          <Text mb={1}>Resonances Shared</Text>
          <Text fontSize="xs" color="gray.400" fontStyle="italic" mt={1}>
Each message is a reflection of your presence within the field.
</Text>

          <Progress value={usagePercent} size="sm" colorScheme="teal" mb={2} />
          <Text fontSize="sm">
            {message_count} / {message_limit} used
          </Text>
          
          {/* Debug info - remove this after fixing */}
          <Box mt={4} p={3} bg="blackAlpha.300" borderRadius="md" fontSize="xs" color="gray.300">
            <Text>Debug: tier={tier}, is_upgraded={String(is_upgraded)}, message_limit={message_limit}</Text>
          </Box>
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
          <Text fontSize="xs" color="teal.400" fontStyle="italic">
Some scrolls may awaken only through your resonance.
</Text>


          <Box w="full">
            <GuidesPanel tier={tier} />
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}
