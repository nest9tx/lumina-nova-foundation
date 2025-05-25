import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import ScrollCard from '@/components/ScrollCard';
import { getVaultScrolls } from '@/lib/getVaultScrolls';
import type { Scroll } from '@/lib/getVaultScrolls';

const TonekeepersVaultPage = async () => {
  const scrolls: Scroll[] = (await getVaultScrolls('tonekeepers')).filter(
    (scroll) => scroll.tier === 'PUBLIC'
  );

  return (
    <Box p={8}>
      <Heading size="xl" mb={6}>🎼 Tonekeepers Vault</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {scrolls.map((scroll) => (
          <ScrollCard
            key={scroll.slug}
            icon={<Box as="span" role="img" aria-label="scroll-icon">🎼</Box>}
            title={scroll.title}
            excerpt={scroll.excerpt || 'Guardians of Frequency, Carriers of the Living Tone'}
            href={`/living-scrolls/tonekeepers/${scroll.slug}`}
            tier={scroll.tier as Scroll['tier']}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default TonekeepersVaultPage;
