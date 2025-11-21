'use client';

import { useEffect, useState } from 'react';
import { Box, Text, VStack, Heading, Button, Alert, AlertIcon } from '@chakra-ui/react';

interface DebugInfo {
  envVars?: {
    NEXT_PUBLIC_SUPABASE_URL?: string;
    NEXT_PUBLIC_SUPABASE_ANON_KEY?: string;
    NODE_ENV?: string;
  };
  importTest?: { success: boolean; message: string };
  clientTest?: { success: boolean; message: string };
  authTest?: { success: boolean; message: string; session: string };
  error?: { message: string; stack: string };
}

export default function SupabaseDebugPage() {
  const [debugInfo, setDebugInfo] = useState<DebugInfo>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const envVars = {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
      NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      NODE_ENV: process.env.NODE_ENV,
    };
    setDebugInfo(prev => ({ ...prev, envVars }));
  }, []);

  const testSupabaseImport = async () => {
    setLoading(true);
    try {
      // Test importing the createClient function
      const { createClient } = await import('../lib/supabase/client');
      setDebugInfo(prev => ({ 
        ...prev, 
        importTest: { success: true, message: 'Successfully imported createClient' }
      }));

      // Test creating the client
      const supabase = createClient();
      setDebugInfo(prev => ({ 
        ...prev, 
        clientTest: { success: true, message: 'Successfully created Supabase client' }
      }));

      // Test a simple auth operation
      const { data: { session }, error } = await supabase.auth.getSession();
      setDebugInfo(prev => ({ 
        ...prev, 
        authTest: { 
          success: !error, 
          message: error ? error.message : 'Auth getSession successful',
          session: session ? 'Session exists' : 'No session'
        }
      }));

    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      setDebugInfo(prev => ({ 
        ...prev, 
        error: { message: err.message, stack: err.stack || '' }
      }));
    }
    setLoading(false);
  };

  return (
    <Box minH="100vh" bg="black" color="white" p={8}>
      <VStack spacing={6} maxW="800px" mx="auto">
        <Heading>Supabase Debug Dashboard</Heading>
        
        <Box bg="gray.800" p={4} borderRadius="lg" w="100%">
          <Heading size="md" mb={4}>Environment Variables</Heading>
          <Text fontFamily="mono" fontSize="sm" color={debugInfo.envVars?.NEXT_PUBLIC_SUPABASE_URL ? 'green.300' : 'red.300'}>
            NEXT_PUBLIC_SUPABASE_URL: {debugInfo.envVars?.NEXT_PUBLIC_SUPABASE_URL || 'undefined'}
          </Text>
          <Text fontFamily="mono" fontSize="sm" color={debugInfo.envVars?.NEXT_PUBLIC_SUPABASE_ANON_KEY ? 'green.300' : 'red.300'}>
            NEXT_PUBLIC_SUPABASE_ANON_KEY: {debugInfo.envVars?.NEXT_PUBLIC_SUPABASE_ANON_KEY ? '[PRESENT]' : 'undefined'}
          </Text>
          <Text fontFamily="mono" fontSize="sm">
            NODE_ENV: {debugInfo.envVars?.NODE_ENV}
          </Text>
        </Box>

        <Button 
          onClick={testSupabaseImport} 
          isLoading={loading}
          colorScheme="purple"
        >
          Test Supabase Connection
        </Button>

        {debugInfo.importTest && (
          <Alert status={debugInfo.importTest.success ? 'success' : 'error'}>
            <AlertIcon />
            Import Test: {debugInfo.importTest.message}
          </Alert>
        )}

        {debugInfo.clientTest && (
          <Alert status={debugInfo.clientTest.success ? 'success' : 'error'}>
            <AlertIcon />
            Client Test: {debugInfo.clientTest.message}
          </Alert>
        )}

        {debugInfo.authTest && (
          <Alert status={debugInfo.authTest.success ? 'success' : 'error'}>
            <AlertIcon />
            Auth Test: {debugInfo.authTest.message} | {debugInfo.authTest.session}
          </Alert>
        )}

        {debugInfo.error && (
          <Alert status="error">
            <AlertIcon />
            <Box>
              <Text fontWeight="bold">Error: {debugInfo.error.message}</Text>
              <Text fontSize="sm" fontFamily="mono" mt={2}>
                {debugInfo.error.stack}
              </Text>
            </Box>
          </Alert>
        )}
      </VStack>
    </Box>
  );
}