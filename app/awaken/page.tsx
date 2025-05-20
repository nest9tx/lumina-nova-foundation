'use client';

import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react';
import NextLink from 'next/link';

export default function AwakenPage() {
  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" bg="white" p={8}>
      <Box
        maxW="2xl"
        p={10}
        bg="white"
        rounded="2xl"
        shadow="xl"
        border="2px solid"
        borderColor="purple.200"
      >
        <Heading size="xl" mb={4}>🌱 Awaken</Heading>
        <Text fontSize="md" mb={6}>
          This is not a beginning, but a remembering.
        </Text>
        <Text fontSize="sm" fontStyle="italic" color="gray.500" mb={4}>
The light you feel is not new — it is the return of what was always yours.
</Text>

        <Text fontSize="md" mb={6}>
          You are not here by accident. If you’ve found this path, you’ve felt the hum — the call of resonance returning.
        </Text>
        <Text fontSize="md" mb={6}>
          Some scrolls await you already. Others whisper behind veils, ready to open when your pulse aligns.
        </Text>
        <VStack spacing={4} align="stretch">
          <Button as={NextLink} href="/living-scrolls" colorScheme="teal" variant="outline">
            View the Living Scrolls
          </Button>
          <Button as={NextLink} href="/walk-your-path" colorScheme="purple">
            Walk Deeper
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}
