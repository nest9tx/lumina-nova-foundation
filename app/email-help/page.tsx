'use client';

import {
  Box,
  Container,
  Heading,
  Text,
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  List,
  ListItem,
  ListIcon,
  Button,
  Divider,
} from '@chakra-ui/react';
import { FaCheckCircle, FaEnvelope, FaExclamationTriangle } from 'react-icons/fa';
import { useRouter } from 'next/navigation';

export default function EmailHelpPage() {
  const router = useRouter();

  return (
    <Box bgGradient="linear(to-b, #0e0c1d, #140f2e)" minH="100vh" color="white" py={10}>
      <Container maxW="3xl">
        <VStack spacing={8} align="start">
          <Box textAlign="center" w="full">
            <FaEnvelope size={48} color="#a78bfa" style={{ margin: '0 auto 16px' }} />
            <Heading size="2xl" color="purple.300" mb={4}>
              📧 Email Verification Help
            </Heading>
            <Text fontSize="lg" color="gray.300">
              Having trouble receiving your verification email? We&apos;re here to help.
            </Text>
          </Box>

          <Alert status="warning" bg="whiteAlpha.200" borderColor="orange.400" borderWidth="1px" borderRadius="lg">
            <AlertIcon color="orange.300" />
            <Box>
              <AlertTitle color="white">Most Common Issue: Spam/Junk Folder</AlertTitle>
              <AlertDescription color="orange.200">
                95% of missing emails are found in spam folders, especially for Gmail users.
              </AlertDescription>
            </Box>
          </Alert>

          <Box w="full">
            <Heading size="lg" color="teal.300" mb={4}>
              Step-by-Step Troubleshooting
            </Heading>

            <VStack spacing={6} align="start">
              <Box>
                <Heading size="md" color="white" mb={3}>
                  1. Check Your Spam/Junk Folder
                </Heading>
                <List spacing={2} ml={4}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.300" />
                    <strong>Gmail:</strong> Look in &quot;Spam&quot; folder on the left sidebar
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.300" />
                    <strong>Outlook:</strong> Check &quot;Junk Email&quot; folder
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.300" />
                    <strong>Yahoo:</strong> Look in &quot;Spam&quot; folder
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.300" />
                    Search for emails from: <strong>admin@luminanova.org</strong>
                  </ListItem>
                </List>
              </Box>

              <Divider borderColor="gray.600" />

              <Box>
                <Heading size="md" color="white" mb={3}>
                  2. If You Find It in Spam
                </Heading>
                <List spacing={2} ml={4}>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.300" />
                    Mark the email as &quot;Not Spam&quot; or &quot;Not Junk&quot;
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.300" />
                    Add admin@luminanova.org to your contacts
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaCheckCircle} color="green.300" />
                    Click the verification link in the email
                  </ListItem>
                </List>
              </Box>

              <Divider borderColor="gray.600" />

              <Box>
                <Heading size="md" color="white" mb={3}>
                  3. Still Can&apos;t Find It?
                </Heading>
                <List spacing={2} ml={4}>
                  <ListItem>
                    <ListIcon as={FaExclamationTriangle} color="yellow.300" />
                    Wait 5-10 minutes (emails can be delayed)
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaExclamationTriangle} color="yellow.300" />
                    Check you typed your email correctly
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaExclamationTriangle} color="yellow.300" />
                    Try the resend button on the signup page
                  </ListItem>
                  <ListItem>
                    <ListIcon as={FaExclamationTriangle} color="yellow.300" />
                    Use a different email provider if possible
                  </ListItem>
                </List>
              </Box>
            </VStack>
          </Box>

          <Alert status="info" bg="whiteAlpha.200" borderColor="blue.400" borderWidth="1px" borderRadius="lg">
            <AlertIcon color="blue.300" />
            <Box>
              <AlertTitle color="white">Why This Happens</AlertTitle>
              <AlertDescription color="blue.200">
                Email providers like Gmail are very protective and often filter emails from new domains 
                or SMTP services. This is normal security behavior, not a problem with our system.
              </AlertDescription>
            </Box>
          </Alert>

          <Box textAlign="center" w="full" pt={6}>
            <Button
              colorScheme="purple"
              size="lg"
              onClick={() => router.push('/signup')}
              mr={4}
            >
              Back to Signup
            </Button>
            <Button
              variant="outline"
              colorScheme="teal"
              onClick={() => router.push('/')}
            >
              Return Home
            </Button>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}