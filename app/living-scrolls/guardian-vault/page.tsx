
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import ScrollCard from '@/components/ScrollCard';
import { getVaultScrolls } from '@/lib/getVaultScrolls';

export default async function GuardianVaultPage() {
  interface Scroll {
    slug: string;
    title: string;
    excerpt?: string;
    tier: 'PUBLIC' | 'ADEPT' | 'GUARDIAN' | 'LUMINARY' | 'SEALED';
  }

  // Fetch scrolls and filter for GUARDIAN tier
  const scrolls: Scroll[] = (await getVaultScrolls('guardian-vault')).filter(
    (scroll: Scroll) => scroll.tier === 'GUARDIAN'
  );

  return (
    <Box p={8}>
      <Heading size="xl" mb={6}>🛡️ Guardian Vault</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {scrolls.map((scroll) => (
          <ScrollCard
            key={scroll.slug}
            icon={<Box as="span" role="img" aria-label="scroll-icon">📜</Box>}
            title={scroll.title}
            excerpt={scroll.excerpt || 'No excerpt available.'}
            href={`/living-scrolls/guardian-vault/${scroll.slug}`}
            tier={scroll.tier}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}