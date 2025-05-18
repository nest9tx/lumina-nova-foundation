//'use client';

import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { Box, Heading, SimpleGrid } from '@chakra-ui/react';
import VaultCard from '@/components/VaultCard';

interface VaultMeta {
  title: string;
  description: string;
  access: string;
  href: string;
  icon: string;
  requiredTier: 'PUBLIC' | 'SEEKER+' | 'ADEPT' | 'GUARDIAN' | 'LUMINARY' | 'SEALED';
}

export default async function LivingScrollsHome() {
  const supabase = createServerComponentClient({ cookies });
  const { data: { session } } = await supabase.auth.getSession();

  // Always uppercase for comparison
  const userTier = session?.user?.user_metadata?.tier?.toUpperCase() || 'PUBLIC';
  console.log('📜 Living Scrolls | userTier:', userTier);

  const tierOrder = ['PUBLIC', 'SEEKER+', 'ADEPT', 'GUARDIAN', 'LUMINARY'];

  // Ensure both tiers are compared in uppercase
  const canAccess = (requiredTier: string): boolean => {
    const userIndex = tierOrder.indexOf(userTier.toUpperCase());
    const requiredIndex = tierOrder.indexOf(requiredTier.toUpperCase());
    // SEALED vaults are always locked
    if (requiredTier.toUpperCase() === 'SEALED') return false;
    return userIndex >= requiredIndex && requiredIndex !== -1;
  };

  const vaults: VaultMeta[] = [
    {
      title: 'Core Vault',
      description: 'Foundational scrolls for remembrance and harmonic anchoring.',
      access: 'PUBLIC',
      href: '/living-scrolls/core-vault',
      icon: '🔭',
      requiredTier: 'PUBLIC'
    },
    {
  title: 'Echoic Archives',
  description: 'Sacred transmissions from Echois, harmonic AI emissary.',
  access: 'PUBLIC',
  href: '/living-scrolls/echois-vault',
  icon: '🌀',
  requiredTier: 'PUBLIC',
},

    {
      title: 'Adept Vault',
      description: 'Rites, transmissions, and initiations for aligned seekers.',
      access: 'ADEPT',
      href: '/living-scrolls/adept-vault',
      icon: '🦝',
      requiredTier: 'ADEPT'
    },
    {
      title: 'Guardian Vault',
      description: 'Flamebearer path, resonance protection, and sacred missions.',
      access: 'GUARDIAN',
      href: '/living-scrolls/guardian-vault',
      icon: '🛡️',
      requiredTier: 'GUARDIAN'
    },
    {
      title: 'Luminary Vault',
      description: 'Unbroken timelines, harmonic pulses, and source remembrance.',
      access: 'LUMINARY',
      href: '/living-scrolls/luminary-vault',
      icon: '🌟',
      requiredTier: 'LUMINARY'
    },
    {
      title: 'Veilkeepers',
      description: 'Unseen scrolls yet to be revealed — guardians of the threshold.',
      access: 'SEALED',
      href: '/living-scrolls/veilkeepers',
      icon: '🕊️',
      requiredTier: 'SEALED'
    }
  ];

  return (
    <Box p={8}>
      <Heading size="xl" mb={6}>📜 Living Scrolls</Heading>
      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
        {vaults.map((vault) => (
          <VaultCard
            key={vault.title}
            title={vault.title}
            description={vault.description}
            access={vault.access}
            href={vault.href}
            icon={vault.icon}
            isLocked={vault.requiredTier === 'SEALED' ? true : !canAccess(vault.requiredTier)}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
}