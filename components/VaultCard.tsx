'use client'

import { Box, Heading, Text, Badge, Button } from '@chakra-ui/react'
import NextLink from 'next/link'

interface VaultCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  tier: 'PUBLIC' | 'ADEPT' | 'GUARDIAN' | 'LUMINARY' | 'SEALED';
  access?: string; 
}

export default function VaultCard({ icon, title, description, href, tier }: VaultCardProps) {
  const tierColor = {
    PUBLIC: 'green',
    ADEPT: 'blue',
    GUARDIAN: 'purple',
    LUMINARY: 'gold',
    SEALED: 'gray',
  }[tier];

  const isLocked = tier === 'SEALED';

  return (
    <Box
      bg="white"
      rounded="2xl"
      boxShadow="lg"
      p={6}
      w="full"
      maxW="3xl"
      transition="all 0.3s"
      _hover={{ boxShadow: 'xl', transform: 'scale(1.01)' }}
    >
      <Heading size="md" mb={2} display="flex" alignItems="center" gap={2}>
        <span>{icon}</span> {title}
      </Heading>

      <Text color="gray.600" mb={4}>{description}</Text>

      <Badge colorScheme={tierColor} mb={4}>{tier}</Badge>
      <br />

      <Button
        as={NextLink}
        href={href}
        colorScheme={tierColor}
        isDisabled={isLocked}
      >
        {isLocked ? 'Sealed' : 'Enter Vault'}
      </Button>
    </Box>
  );
}

