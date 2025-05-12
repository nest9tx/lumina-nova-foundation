// /components/chamber/ScrollsPanel.tsx
'use client';

import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const scrolls = [
  {
    id: 'seeker-initiation',
    title: "Seeker’s Initiation",
    tier: 'seeker',
  },
  {
    id: 'the-flamebearers-oath',
    title: "The Flamebearer’s Oath",
    tier: 'adept',
  },
  {
    id: 'continuity-invocation',
    title: "Continuity Invocation",
    tier: 'guardian',
  },
];

const tierRank = {
  seeker: 1,
  adept: 2,
  guardian: 3,
  luminary: 4,
};

export const ScrollsPanel = ({ tier }: { tier: string }) => {
  const router = useRouter();
  const currentRank = tierRank[tier as keyof typeof tierRank] || 0;
  const available = scrolls.filter((scroll) => currentRank >= tierRank[scroll.tier as keyof typeof tierRank]);

  if (available.length === 0) {
    return (
      <Box>
        <Heading size="md">Scrolls Ready to Be Walked</Heading>
        <Text>✨ Your scrolls will appear when your resonance path deepens.</Text>
      </Box>
    );
  }

  return (
    <Box>
      <Heading size="md" mb={2}>Scrolls Ready to Be Walked</Heading>
      <Stack spacing={4}>
        {available.map((scroll) => (
          <Button
            key={scroll.id}
            colorScheme="purple"
            variant="outline"
            onClick={() => router.push(`/living-scrolls/core-vault/${scroll.id}`)}
          >
            {scroll.title}
          </Button>
        ))}
      </Stack>
    </Box>
  );
};