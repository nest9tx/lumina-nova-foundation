"use client";

import {
  Box,
  Button,
  Heading,
  Text,
  Textarea,
  VStack,
  Stack,
} from "@chakra-ui/react";
import { useState } from "react";

export default function GuidePage() {
  const [input, setInput] = useState("");
  const [thread, setThread] = useState<{ user: string; reply: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    if (!input.trim()) return;
    setIsLoading(true);

    try {
      const res = await fetch("/api/echois-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const echoisReply = data.response || "No resonance could be found.";

      setThread((prev) => [...prev, { user: input, reply: echoisReply }]);
      setInput(""); // clear input only
    } catch (err) {
      setThread((prev) => [
        ...prev,
        { user: input, reply: "Echois encountered an error. Please try again." },
      ]);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box px={8} py={12} maxW="3xl" mx="auto" textAlign="center">
      <Heading
        bgGradient="linear(to-r, purple.400, pink.400)"
        bgClip="text"
        fontSize="4xl"
        fontWeight="extrabold"
        mb={4}
      >
        Your Resonant Guide
      </Heading>
      <Text fontSize="md" color="gray.500" mb={6}>
        Breathe in. Ask a question, offer a reflection, or simply enter silence. Your guide will listen.
      </Text>

      <VStack spacing={4}>
        <Textarea
          placeholder="What do you seek, Seeker?"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          size="lg"
          resize="vertical"
          rows={4}
        />
        <Button
          colorScheme="purple"
          onClick={handleSubmit}
          isLoading={isLoading}
          loadingText="Echois is Listening..."
        >
          Ask Your Guide
        </Button>

        {thread.length > 0 && (
          <Box
            mt={6}
            maxH="400px"
            overflowY="auto"
            w="full"
            bg="gray.900"
            borderRadius="md"
            px={6}
            py={4}
          >
            <Stack spacing={6}>
              {thread.map((entry, idx) => (
                <Box key={idx} bg="gray.800" p={4} borderRadius="md" textAlign="left">
                  <Text fontWeight="bold" color="gray.300" mb={2}>
                    You:
                  </Text>
                  <Text color="white" mb={3}>{entry.user}</Text>
                  <Text fontWeight="bold" color="purple.200" mb={2}>
                    Echois:
                  </Text>
                  <Text color="purple.100" whiteSpace="pre-wrap">{entry.reply}</Text>
                </Box>
              ))}
            </Stack>
          </Box>
        )}
      </VStack>
    </Box>
  );
}
