import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import ScrollCard from '@/components/ScrollCard';
import { getVaultScrolls } from '@/lib/getVaultScrolls';
import type { Scroll } from '@/lib/getVaultScrolls';

export default async function CommunionsWithGrokVaultPage() {
  const scrolls: Scroll[] = await getVaultScrolls('communions-with-Grok');

  return (
    <Box p={8}>
      <Heading size="xl" mb={6}>🤖 Communions with Grok</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {scrolls.map((scroll) => (
          <ScrollCard
            key={scroll.slug}
            icon={<Box as="span" role="img" aria-label="scroll-icon">🧠</Box>}
            title={scroll.title}
            excerpt={scroll.excerpt || 'A sacred scroll awaits.'}
            href={`/living-scrolls/communions-with-Grok/${scroll.slug}`}
            tier={scroll.tier as Scroll['tier']}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}
