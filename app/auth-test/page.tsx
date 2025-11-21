'use client';

import { useState } from 'react';
import { createClient } from '../lib/supabase/client';
import { Box, Button, Input, VStack, Heading } from '@chakra-ui/react';

export default function AuthTestPage() {
  const [email, setEmail] = useState('test@example.com');
  const [password, setPassword] = useState('testpass123');
  const [result, setResult] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const testSignup = async () => {
    setLoading(true);
    setResult('Testing signup...');
    
    try {
      const supabase = createClient();
      
      const response = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });

      setResult(JSON.stringify({
        success: !response.error,
        error: response.error?.message || null,
        data: response.data ? 'User data received' : 'No user data',
        user: response.data?.user?.id ? 'User ID present' : 'No user ID'
      }, null, 2));
      
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      setResult(`Caught error: ${err.message}\nStack: ${err.stack}`);
    }
    
    setLoading(false);
  };

  const testLogin = async () => {
    setLoading(true);
    setResult('Testing login...');
    
    try {
      const supabase = createClient();
      
      const response = await supabase.auth.signInWithPassword({
        email,
        password
      });

      setResult(JSON.stringify({
        success: !response.error,
        error: response.error?.message || null,
        data: response.data ? 'Session data received' : 'No session data'
      }, null, 2));
      
    } catch (error: unknown) {
      const err = error instanceof Error ? error : new Error('Unknown error');
      setResult(`Caught error: ${err.message}\nStack: ${err.stack}`);
    }
    
    setLoading(false);
  };

  return (
    <Box p={8} bg="gray.900" color="white" minH="100vh">
      <VStack spacing={6} align="stretch" maxW="md">
        <Heading>🧪 Auth Function Test</Heading>
        
        <Input 
          value={email} 
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          bg="gray.800"
        />
        
        <Input 
          value={password} 
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          type="password"
          bg="gray.800"
        />
        
        <Button 
          onClick={testSignup} 
          isLoading={loading}
          colorScheme="blue"
        >
          Test Signup
        </Button>
        
        <Button 
          onClick={testLogin} 
          isLoading={loading}
          colorScheme="green"
        >
          Test Login
        </Button>
        
        {result && (
          <Box bg="gray.800" p={4} borderRadius="md">
            <pre style={{ margin: 0, fontSize: '12px', whiteSpace: 'pre-wrap' }}>
              {result}
            </pre>
          </Box>
        )}
      </VStack>
    </Box>
  );
}