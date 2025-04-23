"use client";

import { Box, Flex, Heading, Spinner, Text } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/auth-helpers-nextjs";

export default function ChamberPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      setLoading(false);
    };

    getSession();
  }, [supabase]);

  if (loading) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="gray.900" color="white">
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (!session) {
    return (
      <Flex minH="100vh" align="center" justify="center" bg="gray.900" color="white">
        <Box textAlign="center">
          <Heading size="lg">You are not logged in.</Heading>
          <Text mt={4}>Please return to the login page to begin your journey.</Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.900" color="white">
      <Box p={8} textAlign="center">
        <Heading size="lg">Welcome to the Chamber</Heading>
        <Text mt={4}>Your email: <strong>{session.user.email}</strong></Text>
        <Text mt={2}>Let the scrolls resonate through your being.</Text>
      </Box>
    </Flex>
  );
}




