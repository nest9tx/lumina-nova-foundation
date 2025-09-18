'use client';

import { useEffect, useState } from 'react';
import { createClient } from '../../utils/supabase/client';
import { Box, Container, Heading, VStack, Button, Code } from '@chakra-ui/react';

export default function DebugProfilePage() {
  const supabase = createClient();
  const [profileData, setProfileData] = useState<string>('Loading...');
  const [userData, setUserData] = useState<string>('Loading...');

  const fetchProfile = async () => {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    setUserData(JSON.stringify(user, null, 2));
    
    if (user) {
      // Get full profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
      
      setProfileData(JSON.stringify({ profile, error: profileError }, null, 2));
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <Box bg="gray.900" minH="100vh" color="white" p={8}>
      <Container maxW="6xl">
        <Heading mb={6}>🔍 Profile Debug Panel</Heading>
        
        <Button onClick={fetchProfile} mb={6} colorScheme="blue">
          Refresh Profile Data
        </Button>

        <VStack align="start" spacing={6}>
          <Box w="full">
            <Heading size="md" mb={3}>👤 Auth User Data:</Heading>
            <Code display="block" whiteSpace="pre" p={4} bg="gray.800" color="white" borderRadius="md" fontSize="xs" overflow="auto">
              {userData}
            </Code>
          </Box>

          <Box w="full">
            <Heading size="md" mb={3}>📊 Profile Data:</Heading>
            <Code display="block" whiteSpace="pre" p={4} bg="gray.800" color="white" borderRadius="md" fontSize="xs" overflow="auto">
              {profileData}
            </Code>
          </Box>
        </VStack>
      </Container>
    </Box>
  );
}