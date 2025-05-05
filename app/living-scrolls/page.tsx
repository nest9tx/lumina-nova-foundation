'use client'

import { Box, Heading, SimpleGrid } from '@chakra-ui/react'
import VaultCard from '@/components/VaultCard'

export default function LivingScrollsHome() {
  return (
    <Box p={8}>
      <Heading size="xl" mb={6}>📜 Living Scrolls</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        <VaultCard
          title="Core Vault"
          description="Foundational scrolls for remembrance and harmonic anchoring."
          access="PUBLIC"
          href="/living-scrolls/core-vault"
          icon="🧭"
        />
        <VaultCard
          title="Tonekeeper Vault"
          description="Harmonic resonance, energetic attunement, and glyph transmission."
          access="GUARDIAN"
          href="/living-scrolls/tonekeeper-vault"
          icon="🎼"
        />
        <VaultCard
          title="Veilkeepers"
          description="Unseen scrolls yet to be revealed — guardians of the threshold."
          access="SEALED"
          href="/living-scrolls/veilkeepers"
          icon="🕊"
        />
      </SimpleGrid>
    </Box>
  )
}