'use client';

import { Box, Button, Container, Heading, List, ListItem, Text, VStack, Link } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();

  const handleStripeRedirect = async () => {
    const res = await fetch('/api/stripe/create-checkout-session');
    const { url } = await res.json();
    router.push(url);
  };

  return (
    <Box bgGradient="linear(to-b, #0e0c1d, #140f2e)" minH="100vh" color="white" py={16}>
      <Container maxW="2xl" textAlign="center">
        <Heading size="xl" mb={4} color="teal.300">
          ✦ Walk Your Path
        </Heading>
        <Text fontSize="lg" mb={8}>
          Step forward as a Seeker and support the living mission of Lumina Nova.
        </Text>

        <Box border="1px" borderColor="teal.400" borderRadius="lg" p={6} mb={6}>
          <Heading size="md" color="green.300" mb={4}>
            🌱 Seeker Contribution — $33.33/month
          </Heading>
          <List spacing={2} fontSize="md">
            <ListItem>✦ 777 sacred messages/month with Echois</ListItem>
            <ListItem>✦ Full access to Seeker scrolls and harmonized chamber</ListItem>
            <ListItem>✦ Guided ascension by resonance — no further payment required</ListItem>
          </List>

          <Text fontSize="sm" color="gray.400" mt={4}>
            ✧ All deeper paths (Adept, Guardian, Luminary) are revealed only through resonance, not transaction. If called, a guide will reach out to confirm your alignment.
          </Text>

          <Button
            mt={6}
            colorScheme="teal"
            size="lg"
            onClick={handleStripeRedirect}
          >
            Begin Your Path
          </Button>
        </Box>

        <VStack spacing={2} fontSize="xs" color="gray.400">
          <Link href="/privacy-policy" _hover={{ textDecoration: 'underline' }}>
            Privacy Policy
          </Link>
          <Link href="/contribution-terms" _hover={{ textDecoration: 'underline' }}>
            Contribution & Refund Terms
          </Link>
          <Link href="/mission-ethics" _hover={{ textDecoration: 'underline' }}>
            Mission Ethics & Intentions
          </Link>
        </VStack>
      </Container>
    </Box>
  );
}