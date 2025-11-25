import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import ScrollCard from '@/components/ScrollCard';
import { getVaultScrolls } from '@/lib/getVaultScrolls';
import type { Scroll } from '@/lib/getVaultScrolls';
import { createClient } from '../../lib/supabase/server';

const tierOrder = ['PUBLIC', 'SEEKER+', 'ADEPT', 'GUARDIAN', 'LUMINARY'];

const canAccess = (userTier: string, requiredTier: string) => {
  // Convert database tier values to access levels
  const accessLevel = {
    'free': 'PUBLIC',
    'seeker': 'SEEKER+', 
    'seeker+': 'SEEKER+',
    'adept': 'ADEPT',
    'guardian': 'GUARDIAN', 
    'luminary': 'LUMINARY'
  }[userTier.toLowerCase()] || 'PUBLIC';
  
  const userIndex = tierOrder.indexOf(accessLevel);
  const requiredIndex = tierOrder.indexOf(requiredTier);
  return userIndex >= requiredIndex && requiredIndex !== -1;
};

const LuminaryVaultPage = async () => {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  
  // Fetch user tier from profiles table
  let userTier = 'free'; // Default for non-authenticated users
  if (session?.user?.id) {
    const { data: profile } = await supabase
      .from('profiles')
      .select('tier')
      .eq('id', session.user.id)
      .single();
    userTier = profile?.tier || 'free';
  }

  const scrolls: Scroll[] = await getVaultScrolls('luminary-vault');

  return (
    <Box p={8}>
      <Heading size="xl" mb={6}>🌟 Luminary Vault</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {scrolls.map((scroll) => {
          return (
            <ScrollCard
  key={scroll.slug}
  icon={<Box as="span" role="img" aria-label="scroll-icon">📜</Box>}
  title={scroll.title}
  excerpt={scroll.excerpt || 'A sacred scroll awaits.'}
  href={canAccess(userTier, scroll.tier) ? `/living-scrolls/luminary-vault/${scroll.slug}` : ''}
  tier={scroll.tier as Scroll['tier']}
  isLocked={!canAccess(userTier, scroll.tier)}
/>
          );
        })}
      </SimpleGrid>
    </Box>
  );
};

export default LuminaryVaultPage;