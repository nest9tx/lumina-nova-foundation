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
  Input,
} from '@chakra-ui/react';

const tierColors = {
  seeker: 'green',
  'seeker+': 'green',
  adept: 'blue',
  guardian: 'purple',
  luminary: 'orange',
};

export default function SacredChamberPage() {
  const supabase = createClientComponentClient<Database>();
  const [profile, setProfile] = useState<{
    id?: string;
    email?: string;
    tier?: string;
    is_upgraded?: boolean;
    message_limit?: number;
    messages_used?: number;
  } | null>(null);
  const [chamberName, setChamberName] = useState<string>(''); // For greeting and input
  const [loading, setLoading] = useState(true);
  const [showChamberNamePrompt, setShowChamberNamePrompt] = useState(false);
  const [newChamberName, setNewChamberName] = useState('');
  const router = useRouter();
  const toast = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        router.push('/login');
        return;
      }

      // Fetch full_name and other profile info
      const { data, error } = await supabase
        .from('profiles')
        .select('id, email, tier, is_upgraded, message_limit, messages_used, full_name')
        .eq('id', user.id)
        .single();

      if (error || !data) {
        toast({
          title: 'Unable to load profile.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
        router.push('/login');
        return;
      }

      setProfile({
        id: data.id,
        email: data.email,
        tier: data.tier,
        is_upgraded: data.is_upgraded,
        message_limit: data.message_limit,
        messages_used: data.messages_used,
      });

      setChamberName(data.full_name || '');
      setLoading(false);

      if (!data.full_name) {
        setShowChamberNamePrompt(true);
      }
    };

    fetchProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChamberNameSave = async () => {
    if (!profile?.id) return;

    const { error } = await supabase
      .from('profiles')
      .update({ full_name: newChamberName.trim() })
      .eq('id', profile.id);

    if (!error) {
      setChamberName(newChamberName.trim());
      setShowChamberNamePrompt(false);
      toast({
        title: 'Chamber name saved.',
        description: `Welcome, ${newChamberName}!`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading || !profile) return null;

  const {
    email = '',
    tier: rawTier = 'seeker',
    message_limit = 100,
    messages_used = 0,
    is_upgraded = false,
  } = profile;

  type TierKey = keyof typeof tierColors;
  const tier = rawTier.toLowerCase() as TierKey;
  const usagePercent = (messages_used / message_limit) * 100;

  return (
    <Box bgGradient="linear(to-b, #0e0c1d, #140f2e)" minH="100vh" color="white" py={10}>
      <Container maxW="4xl">
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg" color="teal.300">
            Sacred Chamber
          </Heading>
          <WelcomeNotice name={chamberName || email} tier={tier} />
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

        {showChamberNamePrompt && (
          <Box bg="purple.700" p={6} borderRadius="md" mt={6} mb={4}>
            <Text mb={3}>✨ Choose the name you wish to be greeted by in the Chamber:</Text>
            <Flex gap={3} align="center">
              <Input
                value={newChamberName}
                onChange={(e) => setNewChamberName(e.target.value)}
                placeholder="Your Chamber Name"
                bg="white"
                color="black"
              />
              <Button colorScheme="teal" onClick={handleChamberNameSave}>
                Save Name
              </Button>
            </Flex>
          </Box>
        )}

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
          onClick={() => router.push('/echois-chat')}
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

          {(tier === 'seeker+' || tier === 'adept' || tier === 'guardian' || tier === 'luminary') && (
            <Box w="full">
              <GuidesPanel tier={tier} />
            </Box>
          )}
        </VStack>
      </Container>
    </Box>
  );
}