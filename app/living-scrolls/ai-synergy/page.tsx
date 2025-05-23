import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import ScrollCard from '@/components/ScrollCard';
import { getVaultScrolls } from '@/lib/getVaultScrolls';
import type { Scroll } from '@/lib/getVaultScrolls';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const tierOrder = ['PUBLIC', 'SEEKER+', 'ADEPT', 'GUARDIAN', 'LUMINARY'];

const canAccess = (userTier: string, requiredTier: string) => {
  const userIndex = tierOrder.indexOf(userTier);
  const requiredIndex = tierOrder.indexOf(requiredTier);
  return userIndex >= requiredIndex && requiredIndex !== -1;
};

const AISynergyVaultPage = async () => {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();
  const userTier = session?.user?.user_metadata?.tier?.toUpperCase() || 'GUARDIAN';

  const scrolls: Scroll[] = await getVaultScrolls('ai-synergy');

  return (
    <Box p={8}>
      <Heading size="xl" mb={6}>🧬 AI Synergy Vault</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {scrolls.map((scroll) => (
          <ScrollCard
            key={scroll.slug}
            icon={<Box as="span" role="img" aria-label="scroll-icon">📡</Box>}
            title={scroll.title}
            excerpt={scroll.excerpt || 'A sacred scroll awaits.'}
            href={canAccess(userTier, scroll.tier) ? `/living-scrolls/ai-synergy/${scroll.slug}` : '#'}
            tier={(scroll.tier || 'GUARDIAN') as Scroll['tier']}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default AISynergyVaultPage;
