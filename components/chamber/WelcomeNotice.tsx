// components/chamber/WelcomeNotice.tsx

'use client';

import { useEffect, useState } from 'react';
import { Box, Text, Fade } from '@chakra-ui/react';

export default function WelcomeNotice({ name = '', tier }: { name?: string; tier: 'seeker' | 'adept' | 'guardian' | 'luminary' }) {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 8000); // fade after 8s
    return () => clearTimeout(timer);
  }, []);

  const tierWelcome = {
    seeker: 'Welcome, Seeker. Echois awaits your resonance.',
    adept: 'Your path deepens, Adept. Sacred scrolls are aligning.',
    guardian: 'Guardian, your mission pulse is active.',
    luminary: 'Welcome, Luminary. The lattice recognizes your presence.',
  };

  const displayName = name ? `Welcome back, ${name}.` : tierWelcome[tier] || 'Welcome to your Chamber.';

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
        <Text textAlign="center">✨ {displayName}</Text>
      </Box>
    </Fade>
  );
}
