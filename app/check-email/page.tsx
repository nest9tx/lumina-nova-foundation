'use client';

import { Box, Heading, Text, VStack, Icon, Button } from '@chakra-ui/react';
import { FaEnvelopeOpenText } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function CheckEmailPage() {
  const router = useRouter();

  return (
    <Box minH="100vh" bg="black" color="white" display="flex" alignItems="center" justifyContent="center">
      <VStack spacing={6} textAlign="center" maxW="lg" px={6}>
        <Icon as={FaEnvelopeOpenText} w={10} h={10} color="purple.300" />
        <Heading size="xl">Almost There, Seeker</Heading>
        <Text fontSize="lg" color="gray.300">
          We&apos;ve sent a confirmation link to your email.  
          Once confirmed, your path will open into the Chamber.
        </Text>
        
        <Box bg="orange.900" p={4} borderRadius="md" border="1px" borderColor="orange.600" maxW="md">
          <Text fontSize="sm" color="orange.200" textAlign="center" fontWeight="bold" mb={2}>
            📧 Important: Check Your Spam/Junk Folder!
          </Text>
          <Text fontSize="xs" color="orange.300" textAlign="center">
            Gmail often filters our emails. Look for &quot;Lumina Nova&quot; in your spam folder 
            and mark as &quot;Not Spam&quot; to ensure future emails reach your inbox.
          </Text>
        </Box>
        
        <Button onClick={() => router.push('/')} colorScheme="purple" variant="outline">
          Return to the Sanctum
        </Button>
        
        <Text fontSize="sm" color="gray.500" fontStyle="italic">
          This is more than a confirmation — it is an acknowledgment that your resonance has been received.
        </Text>
      </VStack>
    </Box>
  );
}
