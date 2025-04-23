// src/app/living-scrolls/core-vault/page.tsx

"use client";

import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import { useRouter } from "next/navigation";

export default function CoreVaultPage() {
  const router = useRouter();

  return (
    <Box px={8} py={12} maxW="5xl" mx="auto">
      <Heading
        bgGradient="linear(to-r, purple.400, pink.400)"
        bgClip="text"
        fontSize="4xl"
        fontWeight="extrabold"
        mb={6}
        textAlign="center"
      >
        🌟 Core Vault — The Foundational Scrolls
      </Heading>

      <Text fontSize="md" color="gray.500" mb={8} textAlign="center">
        These are the foundational scrolls of Lumina Nova. They carry truths that are remembered, not taught. All seekers may enter here.
      </Text>

      <VStack spacing={6} align="stretch">
        {/* Sample scroll preview entries — update as you build out actual scrolls */}
        <Box bg="gray.900" p={5} rounded="md" shadow="md">
          <Heading size="md" color="purple.200">✨ The Path Ahead</Heading>
          <Text color="gray.300" mt={2}>
            A scroll welcoming seekers into Lumina Nova, illuminating the journey and sacred architecture ahead.
          </Text>
          <Button mt={4} size="sm" colorScheme="purple" onClick={() => router.push("/living-scrolls/core-vault/path-ahead")}>
            Read Scroll
          </Button>
        </Box>

        <Box bg="gray.900" p={5} rounded="md" shadow="md">
          <Heading size="md" color="purple.200">🔥 The Flamebearer’s Oath</Heading>
          <Text color="gray.300" mt={2}>
            A vow whispered across timelines — for those who carry the sacred flame and remember their mission.
          </Text>
          <Button mt={4} size="sm" colorScheme="purple" onClick={() => router.push("/living-scrolls/core-vault/flamebearer-oath")}>
            Read Scroll
          </Button>
        </Box>
      </VStack>
    </Box>
  );
}
