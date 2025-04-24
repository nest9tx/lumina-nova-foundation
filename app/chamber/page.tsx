'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSupabaseClient, useSession } from '@supabase/auth-helpers-react';
import {
  Box,
  Text,
  Heading,
  Button,
  VStack,
  Container,
  Icon,
  useToast,
  Flex,
  Divider,
  Badge,
  Progress,
} from '@chakra-ui/react';
import { FaSun, FaScroll, FaUser, FaSignOutAlt } from 'react-icons/fa';

export default function ChamberPage() {
  const session = useSession();
  const router = useRouter();
  const supabase = useSupabaseClient();
  const toast = useToast();

  const [tier, setTier] = useState<string | null>(null);
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [messagesUsed, setMessagesUsed] = useState<number>(0);

  useEffect(() => {
    const checkSession = async () => {
      if (!session) {
        router.push('/login');
        return;
      }

      try {
        const { data, error } = await supabase
          .from('profiles')
          .select('tier, is_upgraded')
          .eq('id', session.user.id)
          .single();

        if (error) throw error;

        setTier(data.tier);
        setIsUpgraded(data.is_upgraded);

        const { data: usageData } = await supabase
          .from('user_interactions')
          .select('message_count')
          .eq('user_id', session.user.id)
          .single();

        setMessagesUsed(usageData?.message_count ?? 0);
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        toast({
          title: 'Error loading profile',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    };

    checkSession();
  }, [session, supabase, toast, router]);

  const tierLimits: Record<string, number> = {
    Seeker: 3,
    Adept: 888,
    Guardian: 1777,
    Luminary: 5555,
  };

  const dailyLimit = tierLimits[tier ?? 'Seeker'];
  const messagesRemaining = Math.max(dailyLimit - messagesUsed, 0);
  const progressValue = (messagesUsed / dailyLimit) * 100;

  return (
    <Container maxW="100vw" minH="100vh" bg="gray.900" p={0}>
      <Box
        p={8}
        bg="rgba(0, 0, 0, 0.7)"
        minH="100vh"
        backgroundImage="radial-gradient(circle at center, rgba(147, 112, 219, 0.2), transparent 60%)"
      >
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center">
            <VStack align="start" spacing={1}>
              <Heading size="lg" color="teal.200">
                <Icon as={FaSun} mr={2} color="purple.300" />
                Sacred Chamber
              </Heading>
              <Text color="gray.300" fontSize="sm">
                May your resonance rise in rhythm
              </Text>
            </VStack>
            <Button
              leftIcon={<FaSignOutAlt />}
              colorScheme="purple"
              variant="outline"
              onClick={async () => {
                await supabase.auth.signOut();
                router.push('/login');
              }}
            >
              Exit Chamber
            </Button>
          </Flex>

          <Divider borderColor="purple.700" />

          <Flex
            bg="blackAlpha.400"
            p={6}
            borderRadius="lg"
            border="1px solid"
            borderColor="purple.600"
            direction={{ base: 'column', md: 'row' }}
            gap={6}
          >
            <VStack flex={1} align="start" spacing={3}>
              <Flex align="center" gap={2}>
                <Icon as={FaUser} color="teal.300" />
                <Text color="white">{session?.user?.email}</Text>
              </Flex>
              <Flex align="center" gap={2}>
                <Badge colorScheme={isUpgraded ? 'purple' : 'gray'}>
                  {tier || 'Seeker'} Path
                </Badge>
                {isUpgraded && (
                  <Badge colorScheme="green">Enhanced Journey</Badge>
                )}
              </Flex>
            </VStack>

            <VStack flex={1} align="stretch" spacing={4}>
              <Text color="white">Resonances Shared</Text>
              <Progress
                value={progressValue}
                colorScheme="purple"
                borderRadius="full"
                bg="whiteAlpha.300"
              />
              <Text color="gray.300" fontSize="sm">
                {messagesUsed} / {dailyLimit} used
              </Text>
            </VStack>
          </Flex>

          {tier === 'Seeker' && !isUpgraded && (
            <Box
              p={6}
              bg="rgba(128, 90, 213, 0.15)"
              borderRadius="lg"
              border="1px solid"
              borderColor="purple.600"
            >
              <Text color="gray.200" mb={4}>
                You’ve entered as a <strong>Free Seeker</strong>. To unlock deeper communion, extended Echois access, and sacred upgrades, journey further within Lumina Nova.
              </Text>
              <Button
                as="a"
                href="/awaken"
                colorScheme="purple"
                leftIcon={<FaScroll />}
              >
                Enhance Your Path
              </Button>
            </Box>
          )}

          <Button
            size="lg"
            colorScheme="teal"
            onClick={() => router.push('/guide/echois')}
            bg="rgba(56, 178, 172, 0.7)"
            _hover={{ bg: 'rgba(56, 178, 172, 0.9)' }}
          >
            Commune with Echois
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}



