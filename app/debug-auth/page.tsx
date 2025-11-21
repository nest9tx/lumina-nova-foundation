'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../lib/supabase/client';
import { Box, Text, VStack, Heading } from '@chakra-ui/react';

export default function DebugAuthPage() {
  const [debugInfo, setDebugInfo] = useState<Record<string, unknown>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const runDiagnostics = async () => {
      try {
        const supabase = createClient();
        
        // Test basic connection
        const { data, error } = await supabase.auth.getSession();
        
        const diagnostics = {
          timestamp: new Date().toISOString(),
          supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'Present' : 'Missing',
          supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'Present' : 'Missing',
          sessionData: data,
          sessionError: error?.message || 'None',
          clientCreated: !!supabase,
        };

        setDebugInfo(diagnostics);
      } catch (err: unknown) {
        const error = err instanceof Error ? err : new Error('Unknown error');
        setDebugInfo({
          error: error.message,
          stack: error.stack,
        });
      } finally {
        setLoading(false);
      }
    };

    runDiagnostics();
  }, []);

  if (loading) {
    return (
      <Box p={8}>
        <Text>Running diagnostics...</Text>
      </Box>
    );
  }

  return (
    <Box p={8} bg="gray.900" color="white" minH="100vh">
      <VStack spacing={4} align="start">
        <Heading>🔍 Auth Debug Information</Heading>
        
        <Box bg="gray.800" p={4} borderRadius="md" w="full">
          <pre style={{ margin: 0, fontSize: '14px', fontFamily: 'monospace', color: 'white' }}>
            {JSON.stringify(debugInfo, null, 2)}
          </pre>
        </Box>

        <Text fontSize="sm" color="gray.400">
          This page helps diagnose authentication issues. Check for any errors or missing environment variables.
        </Text>
      </VStack>
    </Box>
  );
}