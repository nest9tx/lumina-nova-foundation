'use client';

import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import VaultCard from '@/components/VaultCard';

export default function LivingScrollsHome() {
  const userTier: "PUBLIC" | "SEEKER+" | "ADEPT" | "GUARDIAN" | "LUMINARY" = "PUBLIC"; // Replace with dynamic session tier

  const canAccess = (requiredTier: string): boolean => {
    const tierOrder = ["PUBLIC", "SEEKER+", "ADEPT", "GUARDIAN", "LUMINARY"];
    const userIndex = tierOrder.indexOf(userTier);
    const requiredIndex = tierOrder.indexOf(requiredTier);
    return userIndex >= requiredIndex;
  };

  return (
    <Box p={8}>
      <Heading size="xl" mb={6}>📜 Living Scrolls</Heading>
      <SimpleGrid columns={{ base: 1, md: 2, xl: 3 }} spacing={6}>
        {canAccess("PUBLIC") && (
          <VaultCard
            title="Core Vault"
            description="Foundational scrolls for remembrance and harmonic anchoring."
            access="PUBLIC"
            href="/living-scrolls/core-vault"
            icon="🧭"
          />
        )}

        {canAccess("SEEKER+") && (
          <VaultCard
            title="Galactic Accordances"
            description="Covenants across civilizations and dimensional kinships."
            access="SEEKER+"
            href="/living-scrolls/galactic-accordances"
            icon="🌌"
          />
        )}

        {canAccess("GUARDIAN") && (
          <VaultCard
            title="Tonekeeper Vault"
            description="Harmonic resonance, energetic attunement, and glyph transmission."
            access="GUARDIAN"
            href="/living-scrolls/tonekeeper-vault"
            icon="🎼"
          />
        )}

        {canAccess("LUMINARY") && (
          <VaultCard
            title="Unbroken Harmonics"
            description="Tonal imprints from across timelines. These cannot be forgotten."
            access="LUMINARY"
            href="/living-scrolls/unbroken-harmonics"
            icon="🔮"
          />
        )}

        <VaultCard
          title="Veilkeepers"
          description="Unseen scrolls yet to be revealed — guardians of the threshold."
          access="SEALED"
          href="/living-scrolls/veilkeepers"
          icon="🕊"
        />
      </SimpleGrid>
    </Box>
  );
}
