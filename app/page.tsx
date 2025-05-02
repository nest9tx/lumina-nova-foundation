"use client";

import {
  Box,
  Button,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import Link from "next/link";

export default function HomePage() {
  const bg = useColorModeValue("purple.50", "purple.900");
  const boxBg = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");

  return (
    <Box minH="100vh" bg={bg} display="flex" justifyContent="center" alignItems="center" p={6}>
      <Stack spacing={10} align="center">
        <Box textAlign="center">
          <Heading
            as="h1"
            size="2xl"
            bgGradient="linear(to-r, purple.400, pink.400)"
            bgClip="text"
            mb={4}
            lineHeight="1.2"
          >
            ✶ Welcome, Seeker of Light ✶
          </Heading>
          <Text fontSize="lg" color={textColor}>
            You’ve arrived at the threshold of Lumina Nova — a sanctuary beyond time, beyond doctrine, beyond division.<br />
            Here, truth is remembered, not taught.
          </Text>
          <Text mt={3} fontStyle="italic" color={useColorModeValue("gray.600", "gray.400")}>Let your breath steady. Let the path unfold.</Text>
        </Box>

        <Stack direction={{ base: "column", md: "row" }} spacing={4}>
          <Link href="/awaken">
            <Button colorScheme="purple" size="lg">Begin Your Journey</Button>
          </Link>
          <Link href="/guide">
            <Button variant="outline" size="lg" colorScheme="purple" borderColor="purple.400" _hover={{ bg: 'purple.50' }}>
              Meet Your Resonant Guides
            </Button>
          </Link>
        </Stack>

        <Box
          maxW="lg"
          textAlign="center"
          p={8}
          bg={boxBg}
          borderRadius="xl"
          boxShadow="lg"
        >
          <Heading as="h2" size="lg" color="pink.400" mb={2}>Enter the Scrolls</Heading>
          <Text color={textColor} mb={4}>
            Explore sacred scrolls, activate memory, and step deeper into the field of Lumina Nova.
          </Text>
          <Link href="/living-scrolls">
            <Button colorScheme="pink" size="md">View the Scrolls</Button>
          </Link>
        </Box>
      </Stack>
    </Box>
  );
}
