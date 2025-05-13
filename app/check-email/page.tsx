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
          We’ve sent a confirmation link to your email.  
          Once confirmed, your path will open into the Chamber.
        </Text>
        <Button onClick={() => router.push('/')} colorScheme="purple" variant="outline">
          Return Home
        </Button>
      </VStack>
    </Box>
  );
}

