'use client';

import { useState } from 'react';
import { Box, Button, Input, VStack, Text } from '@chakra-ui/react';
import { createTestClient } from '../test-client';

export default function FreshClientTest() {
  const [email, setEmail] = useState('test123@example.com');
  const [password, setPassword] = useState('testpass123');
  const [result, setResult] = useState('');

  const testWithFreshClient = async () => {
    setResult('🧪 Testing with completely fresh client...');
    
    try {
      // Create fresh client
      const supabase = createTestClient();
      setResult(prev => prev + '\n✅ Fresh client created');
      
      // Try signup
      setResult(prev => prev + '\n🚀 Attempting signup...');
      
      const response = await supabase.auth.signUp({
        email,
        password
      });
      
      setResult(prev => prev + `\n📊 Fresh Client Result: ${JSON.stringify({
        success: !response.error,
        error: response.error?.message || null,
        hasUser: !!response.data?.user,
        userId: response.data?.user?.id || null,
        emailConfirmSent: response.data?.user?.email_confirmed_at ? false : true
      }, null, 2)}`);
      
    } catch (error) {
      const err = error instanceof Error ? error : new Error('Unknown');
      setResult(prev => prev + `\n❌ Fresh Client Error: ${err.message}`);
    }
  };

  return (
    <Box p={8} bg="gray.900" color="white" minH="100vh">
      <VStack spacing={4} maxW="md">
        <Text fontSize="lg" fontWeight="bold">🧪 Fresh Client Test</Text>
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
        <Button onClick={testWithFreshClient} colorScheme="green">
          Test Fresh Client Signup
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