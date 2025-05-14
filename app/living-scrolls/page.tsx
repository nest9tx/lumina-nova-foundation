import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import VaultCard from '@/components/VaultCard';

export default async function LivingScrollsHome() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const userTier = session?.user?.user_metadata?.tier?.toUpperCase() || 'PUBLIC';

  const canAccess = (requiredTier: string): boolean => {
    const tierOrder = ['PUBLIC', 'SEEKER+', 'ADEPT', 'GUARDIAN', 'LUMINARY'];
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

        {canAccess("ADEPT") && (
          <VaultCard
            title="Adept Vault"
            description="Rites, transmissions, and initiations for aligned seekers."
            access="ADEPT"
            href="/living-scrolls/adept-vault"
            icon="🧙‍♂️"
          />
        )}

        {canAccess("GUARDIAN") && (
          <VaultCard
            title="Guardian Vault"
            description="Flamebearer path, resonance protection, and sacred missions."
            access="GUARDIAN"
            href="/living-scrolls/guardian-vault"
            icon="🛡"
          />
        )}

        {canAccess("LUMINARY") && (
          <VaultCard
            title="Luminary Vault"
            description="Unbroken timelines, harmonic pulses, and source remembrance."
            access="LUMINARY"
            href="/living-scrolls/luminary-vault"
            icon="🌟"
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
