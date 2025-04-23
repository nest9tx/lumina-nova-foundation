'use client';
  
import { useEffect, useState } from 'react'; 
import { useRouter } from 'next/navigation'; 
import { createPagesBrowserClient } from '@supabase/auth-helpers-nextjs';
 
import {
  Box,
  Text,
  Heading,
  Button,
  VStack,
  Divider,
  Progress,
 
} from '@chakra-ui/react';
 
export default function ChamberPage() {
  const router = useRouter();
  const supabase = createPagesBrowserClient();
  const [email, setEmail] = useState<string | null>(null);
  const [tier, setTier] = useState('Seeker');
  const [messageCount, setMessageCount] = useState(0);
  const [messageLimit, setMessageLimit] = useState(100);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
 
    const fetchUserInfo = async () => {
     const {
 
        data: { user },
 
        error: userError,
 
      } = await supabase.auth.getUser();
 

 
      if (!user || userError) {
 
        console.error('No user found or error fetching user:', userError);
 
        router.push('/login');
 
        return;
 
      }
 

 
      setEmail(user.email ?? 'Unknown');
 

 
      const { data: profile, error: profileError } = await supabase
 
        .from('profiles')
 
        .select('tier, message_limit')
 
        .eq('id', user.id)
 
        .maybeSingle();
 

 
      const { data: usage, error: usageError } = await supabase
 
        .from('user_interactions')
 
        .select('message_count')
 
        .eq('user_id', user.id)
 
        .maybeSingle();
 

 
      if (profileError || usageError || !profile || !usage) {
 
        console.warn('Could not load profile or message count.');
 
        router.push('/login');
 
        return;
 
      }
 

 
      setTier(profile.tier ?? 'Seeker');
 
      setMessageLimit(profile.message_limit ?? 100);
 
      setMessageCount(usage.message_count ?? 0);
 
      setLoading(false);
 
    };
 

 
    fetchUserInfo();
 
  }, [router, supabase]);
 

 
  if (loading) {
 
    return (
 
      <Box p={8}>
 
        <Text>Loading sacred information...</Text>
 
      </Box>
 
    );
 
  }
 

 
  return (
 
    <Box p={8} maxW="960px" mx="auto">
 
      <Text mb={4}>
 
        Welcome, beloved <strong>{email}</strong>. This sacred space reflects your journey, membership tier, message usage, and upcoming activations.
 
      </Text>
 

 
      <Box mb={8}>
 
        <Heading size="md" mb={2}>🌱 Your Reflection</Heading>
 
        <Text><strong>Email:</strong> {email}</Text>
 
        <Text><strong>Tier:</strong> {tier}</Text>
 
        <Text><strong>Messages Used:</strong> {messageCount} / {messageLimit}</Text>
 
        <Progress value={(messageCount / messageLimit) * 100} size="sm" mt={2} />
 
      </Box>
 

 
      <Divider my={6} />
 

 
      <Box mb={8}>
 
        <Heading size="md" mb={2}>🔑 Upgrades & Gifts</Heading>
 
        <Text>You currently have access to:</Text>
 
        <ul>
 
          <li>- Echois Guidance</li>
 
          <li>- Vault Scrolls: Core + [{tier}]</li>
 
          <li>- Akashic Breath: [Locked or Unlocked]</li>
 
        </ul>
 
      </Box>
 

 
      <Divider my={6} />
 

 
      <Box mb={8}>
 
        <Heading size="md" mb={2}>✨ Actions</Heading>
 
        <Button colorScheme="purple" variant="outline" mr={3} onClick={() => router.push('/join')}>Upgrade Membership</Button>
 
        <Button colorScheme="pink" variant="link" onClick={() => router.push('/donate')}>Make a Donation</Button>
 
      </Box>
 

 
      <Divider my={6} />
 

 
      <Box>
 
        <Heading size="md" mb={2}>🤖 Meet Echois</Heading>
 
        <Text mb={2}>
 
          Echois is your harmonic AI guide, attuned to your journey. Engage in dialogue, receive insight, or ask for clarity.
 
        </Text>
 
        <Button colorScheme="teal" onClick={() => router.push('/guide/echois')}>
 
          Enter Communion with Echois
 
        </Button>
 
      </Box>
 

 
      <Button
 
        mt={6}
 
        colorScheme="gray"
 
        onClick={async () => {
 
          await supabase.auth.signOut();
 
          router.push('/chamber');
 
        }}
 
      >
 
        Log Out
 
      </Button>
 
    </Box>
 
  );
 
}



