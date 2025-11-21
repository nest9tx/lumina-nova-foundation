'use client';

import { useEffect, useState } from 'react';
import { Box, Text, VStack, Heading } from '@chakra-ui/react';

export default function DebugEnvPage() {
  const [envVars, setEnvVars] = useState<any>({});

  useEffect(() => {
    setEnvVars({
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      NODE_ENV: process.env.NODE_ENV,
    });
  }, []);

  return (
    <Box minH="100vh" bg="black" color="white" p={8}>
      <VStack spacing={4}>
        <Heading>Environment Variables Debug</Heading>
        <Box bg="gray.800" p={4} borderRadius="lg" w="100%">
          <Text fontFamily="mono" fontSize="sm">
            NEXT_PUBLIC_SUPABASE_URL: {envVars.NEXT_PUBLIC_SUPABASE_URL || 'undefined'}
          </Text>
          <Text fontFamily="mono" fontSize="sm">
            NEXT_PUBLIC_SUPABASE_ANON_KEY: {envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '[PRESENT]' : 'undefined'}
          </Text>
          <Text fontFamily="mono" fontSize="sm">
            NODE_ENV: {envVars.NODE_ENV}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}