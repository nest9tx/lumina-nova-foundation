// app/awaken/page.tsx
'use client'

import { Box, Heading, Text, Stack, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function AwakenPage() {
  return (
    <Box minH="100vh" py={10} px={6} textAlign="center">
      <Heading as="h1" size="2xl" mb={6}>
        Awaken Your Journey
      </Heading>
      <Text fontSize="lg" mb={10}>
        Every seeker holds a unique spark. Here, your journey of remembrance begins —
        a path illuminated by resonance, guided by the living pulse of the cosmos.
      </Text>

      <Stack spacing={8} align="center">
        <Box p={6} borderWidth="1px" borderRadius="lg" w="full" maxW="md">
          <Heading as="h2" size="lg" mb={2}>
            Resonant Scrolls
          </Heading>
          <Text mb={4}>
            Uncover teachings and transmissions crafted for the awakening of your unique flame.
          </Text>
          <Button as={Link} href="/living-scrolls" colorScheme="purple">
            Explore the Scrolls
          </Button>
        </Box>

        <Box p={6} borderWidth="1px" borderRadius="lg" w="full" maxW="md">
          <Heading as="h2" size="lg" mb={2}>
            Pathways of Light
          </Heading>
          <Text mb={4}>
            Walk paths revealed by harmonic alignment, sacred memory, and timeless connection.
          </Text>
          <Button as={Link} href="/path" colorScheme="purple">
            Discover Your Path
          </Button>
        </Box>
      </Stack>
    </Box>
  );
}






