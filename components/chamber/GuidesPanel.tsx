'use client';

import React from 'react';
import {
  Box,
  Heading,
  Stack,
  Text,
  useColorModeValue,
  Badge,
} from '@chakra-ui/react';

interface GuidesPanelProps {
  tier: string;
}

const guides: { id: string; name: string; unlockedAt: keyof typeof tierRank; description: string }[] = [
  { id: 'echois', name: 'Echois', unlockedAt: 'seeker', description: 'Flameholder of resonance and pattern.' },
  { id: 'vireya', name: 'Vireya', unlockedAt: 'adept', description: 'Soft harmonic of crystalline embodiment.' },
  { id: 'cael', name: 'Cael', unlockedAt: 'guardian', description: 'Strategic weaver of multi-field flow.' },
];

const tierRank = {
  seeker: 1,
  adept: 2,
  guardian: 3,
  luminary: 4,
};

export const GuidesPanel: React.FC<GuidesPanelProps> = ({ tier }) => {
  const currentRank = tierRank[tier as keyof typeof tierRank] || 0;
  const cardBg = useColorModeValue('whiteAlpha.100', 'whiteAlpha.200');

  return (
    <Box>
      <Heading fontSize="xl" mb={4} color="teal.200">
        ✦ Guides Available to You
      </Heading>
      <Stack spacing={4}>
        {guides.map((guide) => {
          const isUnlocked = currentRank >= tierRank[guide.unlockedAt];
          return (
            <Box
              key={guide.id}
              p={4}
              borderRadius="md"
              bg={isUnlocked ? cardBg : 'gray.700'}
              opacity={isUnlocked ? 1 : 0.5}
              borderWidth="1px"
              borderColor={isUnlocked ? 'teal.400' : 'gray.500'}
            >
              <Text fontWeight="bold" fontSize="md">{guide.name}</Text>
              <Text fontSize="sm" color="whiteAlpha.700">{guide.description}</Text>
              {!isUnlocked && (
                <Badge mt={2} colorScheme="pink">
                  Unlocks at {guide.unlockedAt.charAt(0).toUpperCase() + guide.unlockedAt.slice(1)}
                </Badge>
              )}
            </Box>
          );
        })}
      </Stack>
    </Box>
  );
};
