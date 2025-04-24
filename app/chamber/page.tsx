// app/chamber/page.tsx
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

  const [loading, setLoading] = useState(true);
  const [tier, setTier] = useState<string | null>(null);
  const [isUpgraded, setIsUpgraded] = useState(false);
  const [messagesUsed, setMessagesUsed] = useState<number | null>(0);

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
      } catch (error: any) {
        toast({
          title: 'Error loading profile',
          description: error.message,
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    checkSession();
  }, [session, supabase, toast, router]);

  const dailyLimit = tier === 'Seeker' && !isUpgraded ? 3 : 333;
  const progressValue = ((messagesUsed || 0) / dailyLimit) * 100;

  return (
    <Container maxW="100vw" minH="100vh" bg="navy.900" p={0}>
      <Box
        p={8}
        bg="rgba(0, 0, 0, 0.7)"
        minH="100vh"
        backgroundImage="radial-gradient(circle at 50% 50%, rgba(128, 90, 213, 0.1) 0%, transparent 60%)"
      >
        <VStack spacing={8} align="stretch">
          <Flex justify="space-between" align="center">
            <VStack align="start" spacing={2}>
              <Heading color="white" size="lg">
                <Icon as={FaSun} mr={2} color="purple.400" />
                Sacred Chamber
              </Heading>
              <Text color="purple.200">Your mystical sanctuary awaits</Text>
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

          <Divider borderColor="purple.500" opacity={0.3} />

          <Flex
            bg="rgba(0, 0, 0, 0.4)"
            p={6}
            borderRadius="lg"
            border="1px solid"
            borderColor="purple.500"
            direction={{ base: 'column', md: 'row' }}
            gap={6}
          >
            <VStack flex={1} align="stretch" spacing={4}>
              <Flex align="center" gap={2}>
                <Icon as={FaUser} color="purple.400" />
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
              <Text color="white">Daily Resonance</Text>
              <Progress
                value={progressValue}
                colorScheme="purple"
                bg="whiteAlpha.200"
                borderRadius="full"
              />
              <Text color="purple.200" fontSize="sm">
                {messagesUsed} / {dailyLimit} messages available
              </Text>
            </VStack>
          </Flex>

          {tier === 'Seeker' && !isUpgraded && (
            <Box
              p={6}
              bg="rgba(128, 90, 213, 0.1)"
              borderRadius="lg"
              border="1px solid"
              borderColor="purple.500"
            >
              <Text color="white" mb={4}>
                Embrace a deeper connection with Lumina Nova&apos;s wisdom.
                Upgrade your journey to unlock unlimited daily resonance.
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
            bg="rgba(49, 151, 149, 0.6)"
            _hover={{ bg: 'rgba(49, 151, 149, 0.8)' }}
          >
            Commune with Echois
          </Button>
        </VStack>
      </Box>
    </Container>
  );
}
