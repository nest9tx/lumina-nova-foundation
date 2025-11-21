'use client';

import { useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';

export default function SimpleSignupTest() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('testpass123');
  const [result, setResult] = useState('');

  const testSignup = async () => {
    setResult('Starting test...');
    
    try {
      // Import createClient dynamically
      const { createClient } = await import('../lib/supabase/client');
      setResult(prev => prev + '\n✅ Imported createClient');
      
      // Create client
      const supabase = createClient();
      setResult(prev => prev + '\n✅ Created Supabase client');
      
      // Test environment variables
      const hasUrl = !!process.env.NEXT_PUBLIC_SUPABASE_URL;
      const hasKey = !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      setResult(prev => prev + `\n🔍 Env vars - URL: ${hasUrl}, Key: ${hasKey}`);
      
      // Try signup
      setResult(prev => prev + '\n🚀 Attempting signup...');
      
      const response = await supabase.auth.signUp({
        email,
        password
      });
      
      setResult(prev => prev + `\n📊 Response: ${JSON.stringify({
        error: response.error?.message || null,
        hasUser: !!response.data?.user,
        userId: response.data?.user?.id || null
      }, null, 2)}`);
      
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown');
      setResult(prev => prev + `\n❌ Error: ${err.message}\nStack: ${err.stack}`);
    }
  };

  return (
    <Box p={8} bg="gray.900" color="white" minH="100vh">
      <VStack spacing={4} maxW="md">
        <Input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <Input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
        />
        <Button onClick={testSignup} colorScheme="blue">
          Test Simple Signup
        </Button>
        {result && (
          <Box bg="gray.800" p={4} w="full" borderRadius="md">
            <Text fontSize="sm" fontFamily="mono" whiteSpace="pre-wrap">
              {result}
            </Text>
          </Box>
        )}
      </VStack>
    </Box>
  );
}