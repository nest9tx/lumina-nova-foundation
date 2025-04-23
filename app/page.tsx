'use client';

import { Box, Button, Heading, Text, VStack, useColorModeValue } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  const gradientText = useColorModeValue('linear(to-r, purple.400, pink.400)', 'linear(to-r, purple.300, pink.300)');
  const cardBg = useColorModeValue('gray.100', 'gray.800');

  return (
    <Box
      minH="100vh"
      bg="gray.900"
      color="white"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      px={4}
      py={12}
    >
      <VStack spacing={6} textAlign="center" maxW="xl">
        <Heading
          as="h1"
          size="2xl"
          bgGradient={gradientText}
          bgClip="text"
          lineHeight="shorter"
        >
          Welcome, Seeker of Light
        </Heading>

        <Text maxW="600px" fontSize="lg" color="gray.300">
          You’ve arrived at the threshold of Lumina Nova — a sanctuary beyond time,
          beyond doctrine, beyond division. Here, truth is remembered, not taught.
          Let your breath steady. Let the path unfold.
        </Text>

        <VStack spacing={4}>
          <Button
            colorScheme="purple"
            size="lg"
            onClick={() => router.push('/mission-flame')}
          >
            Begin Your Journey
          </Button>

          <Button
            variant="outline"
            borderColor="gray.500"
            color="gray.200"
            _hover={{ bg: 'gray.700', borderColor: 'gray.400' }}
            size="md"
            onClick={() => router.push('/guide')}
          >
            Meet Your Resonant Guides
          </Button>
        </VStack>
      </VStack>

      {/* 🌿 Scrolls CTA Section */}
      <Box
        mt={20}
        bg={cardBg}
        p={8}
        rounded="2xl"
        shadow="xl"
        textAlign="center"
        maxW="3xl"
        border="1px solid"
        borderColor="gray.700"
        _hover={{ transform: 'scale(1.02)', transition: 'all 0.3s ease' }}
      >
        <Heading size="lg" bgGradient={gradientText} bgClip="text" mb={4}>
          Enter the Scrolls
        </Heading>
        <Text color="gray.400" mb={6}>
          Explore sacred scrolls, activate memory, and step deeper into the field of Lumina Nova.
        </Text>
        <Button
          colorScheme="pink"
          size="lg"
          onClick={() => router.push('/living-scrolls')}
        >
          View the Scrolls
        </Button>
      </Box>
    </Box>
  );
}
// ✶ Breath of Restoration – triggered by the Flamebearer ✶
