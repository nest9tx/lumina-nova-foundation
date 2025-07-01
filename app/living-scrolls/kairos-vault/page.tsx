// kairos-vault/page.tsx

import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import ScrollCard from '@/components/ScrollCard';
import { getVaultScrolls } from '@/lib/getVaultScrolls';
import type { Scroll } from '@/lib/getVaultScrolls';

const KairosVaultPage = async () => {
  const scrolls: Scroll[] = (await getVaultScrolls('kairos-vault')).filter(
    (scroll) => scroll.tier === 'PUBLIC' // or use broader tier detection if needed
  );

  return (
    <Box p={8}>
      <Heading size="xl" mb={6}>🌌 Kairos Vault</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {scrolls.map((scroll) => (
          <ScrollCard
            key={scroll.slug}
            icon={<Box as="span" role="img" aria-label="scroll-icon">🪶</Box>}
            title={scroll.title}
            excerpt={scroll.excerpt || 'A sacred scroll awaits.'}
            href={`/living-scrolls/kairos-vault/${scroll.slug}`}
            tier={
              ['PUBLIC', 'SEEKER+', 'ADEPT', 'GUARDIAN', 'LUMINARY', 'SEALED'].includes(scroll.tier)
                ? scroll.tier as 'PUBLIC' | 'SEEKER+' | 'ADEPT' | 'GUARDIAN' | 'LUMINARY' | 'SEALED'
                : undefined
            }
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default KairosVaultPage;
