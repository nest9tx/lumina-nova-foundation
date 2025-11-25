import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import ScrollCard from '@/components/ScrollCard';
import { getVaultScrolls } from '@/lib/getVaultScrolls';

export default async function AdeptVaultPage() {
  interface Scroll {
    slug: string;
    title: string;
    excerpt?: string;
    tier: 'PUBLIC' | 'SEEKER+' | 'ADEPT' | 'GUARDIAN' | 'LUMINARY' | 'SEALED';
  }

  // Show all scrolls in adept vault (now SEEKER+ accessible)
  const scrolls: Scroll[] = await getVaultScrolls('adept-vault');

  return (
    <Box p={8}>
      <Heading size="xl" mb={6}>🔷 Adept Vault</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {scrolls.map((scroll) => (
          <ScrollCard
            key={scroll.slug}
            icon={<Box as="span" role="img" aria-label="scroll-icon">📜</Box>}
            title={scroll.title}
            excerpt={scroll.excerpt || 'A sacred scroll awaits.'}
            href={`/living-scrolls/adept-vault/${scroll.slug}`}
            tier={scroll.tier}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}