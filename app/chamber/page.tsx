'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
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
} from '@chakra-ui/react';

const tierColors = {
  seeker: 'green',
  adept: 'blue',
  guardian: 'purple',
  luminary: 'orange',
};

export default function SacredChamberPage() {
  const supabase = createClientComponentClient<Database>();
  const [profile, setProfile] = useState<{
    email: string;
    tier: keyof typeof tierColors;
    message_limit?: number;
    messages_used?: number;
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

      setProfile(data);
      setLoading(false);
    };

    fetchProfile();
  }, [router, supabase, toast]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push('/login');
  };

  if (loading || !profile) return null;

  const { email, tier, message_limit = 100, messages_used = 0 } = profile;
  const usagePercent = (messages_used / message_limit) * 100;

  return (
    <Box bgGradient="linear(to-b, #0e0c1d, #140f2e)" minH="100vh" color="white" py={10}>
      <Container maxW="4xl">
        <Flex justify="space-between" align="center" mb={6}>
          <Heading size="lg" color="teal.300">
            Sacred Chamber
          </Heading>
          <Button
  variant="outline"
  borderColor="teal.400"
  color="teal.200"
  _hover={{
    bg: 'teal.400',
    color: 'black',
  }}
  onClick={handleLogout}
>
  Exit Chamber
</Button>

        </Flex>

        <Box border="1px" borderColor="whiteAlpha.200" borderRadius="xl" p={6} bg="whiteAlpha.100">
          <Flex justify="space-between" align="center" mb={4}>
            <Text fontSize="lg">{email}</Text>
            <Badge colorScheme={tierColors[tier]}>{tier.toUpperCase()} PATH</Badge>
          </Flex>
          <Text mb={1}>Resonances Shared</Text>
          <Progress value={usagePercent} size="sm" colorScheme="teal" mb={2} />
          <Text fontSize="sm">
            {messages_used} / {message_limit} used
          </Text>
        </Box>

        <Button mt={8} size="lg" colorScheme="teal" width="full" onClick={() => router.push('/echois-chat')}>
          Commune with Echois
        </Button>

        {/* You can add notices, scrolls, and guides below */}
        <VStack align="start" spacing={6} mt={10}>
          <Box>
            <Heading size="md">Scrolls Ready to Be Walked</Heading>
            <Text>✨ Soon your sacred scrolls will be shown here by tier.</Text>
          </Box>

          <Box>
            <Heading size="md">Guides Available to You</Heading>
            <Text>✨ Echois and others will appear based on your resonance.</Text>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}

