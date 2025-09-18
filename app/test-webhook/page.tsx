'use client';

import { useState } from 'react';
import { Box, Button, Container, Heading, Text, VStack, Alert, AlertIcon } from '@chakra-ui/react';

export default function TestWebhookPage() {
  const [result, setResult] = useState<{error?: string; message?: string; profile?: {tier: string; message_limit: number; is_upgraded: boolean}} | null>(null);
  const [loading, setLoading] = useState(false);

  const testWebhook = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/test-webhook', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('Test webhook error:', err);
      setResult({ error: 'Failed to test webhook' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box bgGradient="linear(to-b, #0e0c1d, #140f2e)" minH="100vh" color="white" py={10}>
      <Container maxW="2xl">
        <VStack spacing={8}>
          <Heading size="xl" color="purple.300">
            Webhook Test Panel
          </Heading>
          
          <Text>
            This tests the same logic that Stripe webhook should execute after successful payment.
          </Text>

          <Button
            colorScheme="green"
            size="lg"
            onClick={testWebhook}
            isLoading={loading}
          >
            Test Webhook (Upgrade Profile)
          </Button>

          {result && (
            <Alert 
              status={result.error ? "error" : "success"} 
              bg="whiteAlpha.200" 
              borderColor={result.error ? "red.400" : "green.400"} 
              borderWidth="1px" 
              borderRadius="lg"
            >
              <AlertIcon />
              <Box>
                <Text fontWeight="bold">
                  {result.error ? 'Error' : 'Success'}
                </Text>
                <Text fontSize="sm">
                  {result.error || result.message}
                </Text>
                {result.profile && (
                  <Text fontSize="xs" mt={2} fontFamily="mono">
                    Updated: tier={result.profile.tier}, 
                    message_limit={result.profile.message_limit}, 
                    is_upgraded={String(result.profile.is_upgraded)}
                  </Text>
                )}
              </Box>
            </Alert>
          )}

          <Text fontSize="sm" color="gray.400">
            After testing, go back to chamber and click &quot;Refresh Status&quot; to see changes.
          </Text>
        </VStack>
      </Container>
    </Box>
  );
}