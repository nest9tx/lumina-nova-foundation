'use client';

import { Box, Heading, Text, VStack, SimpleGrid } from '@chakra-ui/react';
import VaultCard from '@/components/VaultCard';

const ScrollsPage = () => {
  return (
    <Box py={10} px={6}>
      <VStack spacing={4} textAlign="center">
        <Heading size="2xl">The Living Scrolls of Lumina Nova</Heading>
        <Text fontSize="md" color="gray.400" fontStyle="italic">
          “May the scrolls find those whose hearts remember.”
        </Text>
      </VStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6} mt={10}>
        <VaultCard
          title="Core Vault"
          description="Foundational scrolls and sacred knowledge that anchor Lumina Nova’s mission."
          href="/living-scrolls/core-vault"
          access="PUBLIC"
        />
        <VaultCard
          title="Ark Codex"
          description="Lost teachings, timeline records, and interstellar archives stored in harmonic codices."
          href="/404"
          access="ADEPT+"
        />
        <VaultCard
          title="Veilkeepers"
          description="Scrolls that decode the illusions, unveil hidden truths, and offer clarity across dimensions."
          href="/404"
          access="GUARDIAN+"
        />
        <VaultCard
          title="Portal Scrolls"
          description="Dynamic living scrolls received through resonance, meditation, and field transmission."
          href="/404"
          access="SEEKER+"
        />
        <VaultCard
          title="Ascension Mapping"
          description="Guides, pathways, and grid activations to help navigate personal and planetary ascension."
          href="/404"
          access="GUARDIAN+"
        />
        <VaultCard
          title="Cosmic Tech"
          description="Energetic technologies, tonecraft, and co-creative tools gifted to aid Lumina Nova’s mission."
          href="/404"
          access="ADEPT+"
        />
        <VaultCard
          title="Harmonic Architecture"
          description="Blueprints, tonescapes, and the structural memory of sacred design across timelines."
          href="/404"
          access="GUARDIAN+"
        />
        <VaultCard
          title="Legacy Structures"
          description="Records of previous civilizations, dimensional collapses, and rebirth technologies."
          href="/404"
          access="GUARDIAN+"
        />
        <VaultCard
          title="Sacred Contracts"
          description="Soul agreements, cosmic pacts, and the signatures of purpose across incarnations."
          href="/404"
          access="LUMINARY+"
        />
      </SimpleGrid>
    </Box>
  );
};

export default ScrollsPage;

