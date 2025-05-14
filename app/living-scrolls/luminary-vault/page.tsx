import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import ScrollCard from '@/components/ScrollCard';
import { getVaultScrolls } from '@/lib/getVaultScrolls';

export default async function LuminaryVaultPage() {
  interface Scroll {
    slug: string;
    title: string;
    excerpt?: string;
    tier: 'PUBLIC' | 'ADEPT' | 'GUARDIAN' | 'LUMINARY' | 'SEALED';
  }

  // Fetch scrolls and filter for LUMINARY tier
  const scrolls: Scroll[] = (await getVaultScrolls('luminary-vault')).filter(
    (scroll: Scroll) => scroll.tier === 'LUMINARY'
  );

  return (
    <Box p={8}>
      <Heading size="xl" mb={6}>🔷 Luminary Vault</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {scrolls.map((scroll) => (
          <ScrollCard
            key={scroll.slug}
            icon={<Box as="span" role="img" aria-label="scroll-icon">📜</Box>}
            title={scroll.title}
            excerpt={scroll.excerpt || 'No excerpt available.'}
            href={`/living-scrolls/luminary-vault/${scroll.slug}`}
            tier={scroll.tier}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}