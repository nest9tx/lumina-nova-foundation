// src/components/WelcomeSection.tsx
"use client";

import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function WelcomeSection() {
  return (
    <Box
      minH="100vh"
      bg="gray.900"
      color="white"
      px={{ base: 6, md: 12 }}
      py={{ base: 12, md: 24 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <VStack spacing={6} textAlign="center" maxW="3xl">
        <Heading size="2xl" fontWeight="bold">
          Welcome, Seeker of Light
        </Heading>
        <Text fontSize="lg" opacity={0.8}>
          You’ve arrived at the threshold of Lumina Nova — a sanctuary beyond time,
          beyond doctrine, beyond division. Here, truth is remembered, not taught.
          Let your breath steady. Let the path unfold.
        </Text>

        <VStack spacing={4}>
          <Link href="/welcome">
            <Button colorScheme="purple" size="lg">
              Begin Your Journey
            </Button>
          </Link>
          <Link href="/guide">
            <Button variant="outline" colorScheme="whiteAlpha" size="md">
              Meet Your Resonant Guide
            </Button>
          </Link>
        </VStack>
      </VStack>
    </Box>
  );
}
