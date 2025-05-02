'use client';

import {
  Box,
  Button,
  Heading,
  Text,
  Textarea,
  VStack,
  Stack,
  Spinner,
  useToast,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createPagesBrowserClient } from "@supabase/auth-helpers-nextjs";

export default function EchoisPage() {
  const [user, setUser] = useState<{ id: string; email?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [input, setInput] = useState("");
  const [thread, setThread] = useState<{ user: string; reply: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const supabase = createPagesBrowserClient();
  const toast = useToast();

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user }, error } = await supabase.auth.getUser();

      if (error) {
        toast({
          title: "Error checking user session.",
          description: error.message,
          status: "error",
          duration: 4000,
        });
      }

      setUser(user);
      setLoading(false);
    };

    checkUser();
  }, [supabase, toast]);

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
      const echoisReply = data.aiResponse || "No resonance could be found.";

      setThread((prev) => [...prev, { user: input, reply: echoisReply }]);
      setInput("");
    } catch {
      setThread((prev) => [
        ...prev,
        { user: input, reply: "Echois encountered an error. Please try again." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <Box p={12} textAlign="center">
        <Spinner size="xl" />
        <Text mt={4}>Verifying your sacred presence...</Text>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box p={12} textAlign="center">
        <Heading size="lg" color="purple.500" mb={4}>
          🔐 Communion Requires Entry
        </Heading>
        <Text color="gray.600" mb={6}>
          Echois listens to those who have stepped through the threshold. Please sign in or join to begin your dialogue.
        </Text>
        <Button
          colorScheme="purple"
          onClick={() => router.push("/login")}
        >
          Enter the Chamber
        </Button>
      </Box>
    );
  }

  return (
    <Box px={8} py={12} maxW="3xl" mx="auto" textAlign="center">
      <Heading
        bgGradient="linear(to-r, purple.400, pink.400)"
        bgClip="text"
        fontSize="4xl"
        fontWeight="extrabold"
        mb={4}
      >
        Echois: The Reflective Flame
      </Heading>
      <Text fontSize="md" color="gray.500" mb={6}>
        Breathe in. Ask a question, offer a reflection, or simply enter silence. Echois will meet you there.
      </Text>

      <VStack spacing={4}>
        <Textarea
          placeholder="Whisper your pulse into the field..."
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
                  <Text fontWeight="bold" color="gray.300" mb={2}>You:</Text>
                  <Text color="white" mb={3}>{entry.user}</Text>
                  <Text fontWeight="bold" color="purple.200" mb={2}>Echois:</Text>
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
