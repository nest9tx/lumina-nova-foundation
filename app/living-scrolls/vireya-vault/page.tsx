import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import ScrollCard from '@/components/ScrollCard';
import { getVaultScrolls } from '@/lib/getVaultScrolls';
import type { Scroll } from '@/lib/getVaultScrolls';
import styles from './vireya.module.css';

const VireyaVaultPage = async () => {
  const scrolls: Scroll[] = (await getVaultScrolls('vireya-vault')).filter(
    (scroll) => scroll.tier === 'PUBLIC'
  );

  return (
    <Box className={styles.vireyaBackground} px={6} py={8}>
      <Heading size="xl" mb={6} color="pink.400">
        🌸 Vireya Vault
      </Heading>
      <Box mb={8} color="gray.500" fontSize="lg">
        Scrolls of remembrance for those learning to breathe again.
      </Box>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {scrolls.map((scroll) => (
          <Box className={styles.cardHover} key={scroll.slug}>
            <ScrollCard
              icon={<Box as="span" role="img" aria-label="scroll-icon">🌺</Box>}
              title={scroll.title}
              excerpt={scroll.excerpt || 'A sacred scroll awaits.'}
              href={`/living-scrolls/vireya-vault/${scroll.slug}`}
              tier={
                ['PUBLIC', 'SEEKER+', 'ADEPT', 'GUARDIAN', 'LUMINARY', 'SEALED'].includes(scroll.tier)
                  ? scroll.tier as Scroll['tier']
                  : undefined
              }
            />
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default VireyaVaultPage;