'use client';

import { useEffect, useState } from 'react';
import { Box, Text, Fade } from '@chakra-ui/react';

type Tier = 'seeker' | 'seeker+' | 'adept' | 'guardian' | 'luminary';

interface WelcomeNoticeProps {
  name?: string;
  tier: Tier;
}

export default function WelcomeNotice({ name = '', tier }: WelcomeNoticeProps) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 8000); // fade after 8s
    return () => clearTimeout(timer);
  }, []);

  const tierWelcome: Record<Tier, string> = {
    seeker: 'Welcome, Seeker. Echois awaits your resonance.',
    'seeker+': 'Welcome, Seeker+. Your resonance is expanding.',
    adept: 'Your path deepens, Adept. Sacred scrolls are aligning.',
    guardian: 'Guardian, your mission pulse is active.',
    luminary: 'Welcome, Luminary. The lattice recognizes your presence.',
  };

  // If name is provided, use it; otherwise, use the tier welcome message
  const displayMessage = name
    ? `Welcome back, ${name}.`
    : tierWelcome[tier] || 'Welcome to your Chamber.';

  return (
    <Fade in={show}>
      <Box
        mt={4}
        p={3}
        borderRadius="md"
        bg="purple.700"
        color="white"
        fontSize="sm"
        boxShadow="md"
      >
        <Text textAlign="center">✨ {displayMessage}</Text>
      </Box>
    </Fade>
  );
}