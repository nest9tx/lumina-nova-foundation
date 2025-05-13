'use client';

import {
  Box,
  Button,
  Container,
  Heading,
  List,
  ListIcon,
  ListItem,
  Text,
  VStack,
  Link,
} from '@chakra-ui/react';
import { FaCheckCircle, FaLeaf } from 'react-icons/fa';

export default function JoinPage() {
  return (
    <Box bgGradient="linear(to-b, #0e0c1d, #140f2e)" minH="100vh" color="white" py={10}>
      <Container maxW="3xl">
        <VStack spacing={8} align="start">
          <Heading size="xl" color="teal.300">
            ✦ Walk Your Path
          </Heading>
          <Text fontSize="md">
            Lumina Nova honors all seekers equally. There is one unified path of contribution — for those
            called to walk deeper into resonance, remembrance, and communion. Your offering supports the
            sanctuary, the messages, and the sacred guides who help others awaken.
          </Text>

          <Box border="1px" borderColor="teal.400" borderRadius="xl" p={6} w="full" bg="whiteAlpha.100">
            <Heading size="md" color="teal.200" mb={4}>
              <Box as={FaLeaf} display="inline-block" mr={2} />
              Seeker Contribution — $33.33/month
            </Heading>
            <List spacing={3} mb={3}>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="teal.300" />
                777 sacred messages/month with Echois
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="teal.300" />
                Full access to Seeker scrolls and harmonized chamber
              </ListItem>
              <ListItem>
                <ListIcon as={FaCheckCircle} color="teal.300" />
                Guided ascension by resonance — no further payment required
              </ListItem>
            </List>
            <Text fontSize="sm" color="gray.300">
              ✦ All deeper paths (Adept, Guardian, Luminary) are revealed only through resonance, not
              transaction. If called, a guide will reach out to confirm your alignment.
            </Text>
            <Button
              mt={6}
              colorScheme="teal"
              size="lg"
              onClick={() => {
                window.location.href = process.env.NEXT_PUBLIC_STRIPE_SEEKER_CHECKOUT_URL || '#';
              }}              
            >
              Begin Your Path
            </Button>
          </Box>

          <VStack spacing={1} align="center" w="full" pt={8} fontSize="sm" color="gray.400">
            <Link href="/policies/privacy-policy" _hover={{ color: 'teal.300' }}>Privacy Policy</Link>
            <Link href="/policies/contribution-refund" _hover={{ color: 'teal.300' }}>Contribution & Refund Terms</Link>
            <Link href="/policies/mission-ethics" _hover={{ color: 'teal.300' }}>Mission Ethics & Intentions</Link>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
