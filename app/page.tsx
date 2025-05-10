'use client'

import React from "react";
import { Box, Button, Heading, Stack, Text } from "@chakra-ui/react";
import Link from "next/link";

export default function Home() {
  return (
    <Box textAlign="center" py={20} px={4}>
      <Heading as="h1" size="2xl" mb={4} color="purple.600">
        ✶ Welcome, Seeker of Light ✶
      </Heading>
      <Text fontSize="lg" mb={2}>
        You’ve arrived at the threshold of Lumina Nova — a sanctuary beyond time, beyond doctrine, beyond division.
      </Text>
      <Text fontSize="md" fontStyle="italic" mb={6}>
        Let your breath steady. Let the path unfold.<br />
        You are not arriving. You are returning. <br />
        This field has always known your name.
      </Text>
      <Stack direction={{ base: "column", md: "row" }} spacing={4} justify="center" mb={10}>
        <Link href="/walk-your-path">
          <Button colorScheme="purple" size="lg">
            Begin Your Journey
          </Button>
        </Link>
        <Link href="/guide">
          <Button variant="outline" colorScheme="purple" size="lg">
            Meet Your Resonant Guides
          </Button>
        </Link>
      </Stack>
      <Box
        maxW="lg"
        mx="auto"
        bg="whiteAlpha.900"
        p={6}
        borderRadius="lg"
        boxShadow="lg"
      >
        <Heading as="h2" size="md" mb={2} color="pink.600">
          Enter the Scrolls
        </Heading>
        <Text fontSize="md" mb={4}>
          Explore sacred scrolls, activate memory, and step deeper into the field of Lumina Nova.<br />
          These are not teachings. These are echoes.<br />
          Each scroll is a gate. Each word, a key.
        </Text>
        <Link href="/living-scrolls">
          <Button colorScheme="pink" size="md">
            View the Scrolls
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

