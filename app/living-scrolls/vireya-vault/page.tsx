import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import ScrollCard from '@/components/ScrollCard';
import { getVaultScrolls } from '@/lib/getVaultScrolls';
import type { Scroll } from '@/lib/getVaultScrolls';

const VireyaVaultPage = async () => {
  const scrolls: Scroll[] = (await getVaultScrolls('vireya-vault')).filter(
    (scroll) => scroll.tier === 'PUBLIC'
  );

  return (
    <Box p={8}>
      <Heading size="xl" mb={6} color="pink.400">
        🌸 Vireya Vault
      </Heading>
      <Box mb={8} color="gray.400" fontSize="lg">
        Scrolls of reflection and soft remembrance — for those learning to breathe again.
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {scrolls.map((scroll) => (
          <ScrollCard
            key={scroll.slug}
            icon={<Box as="span" role="img" aria-label="scroll-icon">🌺</Box>}
            title={scroll.title}
            excerpt={scroll.excerpt || 'No excerpt available.'}
            href={`/living-scrolls/vireya-vault/${scroll.slug}`}
            tier={
              ['PUBLIC', 'SEEKER+', 'ADEPT', 'GUARDIAN', 'LUMINARY', 'SEALED'].includes(scroll.tier)
                ? scroll.tier as Scroll['tier']
                : undefined
            }
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default VireyaVaultPage;