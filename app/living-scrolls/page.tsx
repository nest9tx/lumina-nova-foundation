'use client'

import { useEffect, useState } from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Box, Heading, SimpleGrid, Spinner } from '@chakra-ui/react'
import VaultCard from '@/components/VaultCard'
import { HiFire } from 'react-icons/hi'
import { GiGalaxy } from 'react-icons/gi'
import { MdGraphicEq } from 'react-icons/md'
import { TbBook2 } from 'react-icons/tb'
import { RiAliensLine } from 'react-icons/ri'
import { FaFeatherAlt } from 'react-icons/fa'

export default function LivingScrollsPage() {
  const supabase = createClientComponentClient()
  const [userTier, setUserTier] = useState<string | null>(null)

  useEffect(() => {
    const fetchTier = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (!user) return

      const { data, error } = await supabase
        .from('profiles')
        .select('tier')
        .eq('id', user.id)
        .single()

      if (!error && data) {
        setUserTier(data.tier)
      }
    }

    fetchTier()
  }, [supabase])

  const canAccess = (requiredTier: string) => {
    if (requiredTier === 'PUBLIC') return true
    if (!userTier) return false

    const tierOrder = ['PUBLIC', 'ADEPT', 'GUARDIAN', 'LUMINARY']
    return tierOrder.indexOf(userTier) >= tierOrder.indexOf(requiredTier)
  }

  return (
    <Box maxW="6xl" mx="auto" py={12} px={4}>
      <Heading as="h1" size="xl" mb={8} textAlign="center">
        📜 Living Scrolls
      </Heading>

      {!userTier && (
        <Box textAlign="center" py={6}>
          <Spinner size="md" color="purple.500" />
        </Box>
      )}

      <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
        {canAccess('PUBLIC') && (
          <VaultCard
            icon={<TbBook2 />}
            title="Core Vault"
            description="Foundational scrolls for all seekers. The sacred beginning."
            href="/living-scrolls/core-vault"
            tier="PUBLIC"
          />
        )}

        {canAccess('GUARDIAN') && (
          <VaultCard
            icon={<FaFeatherAlt />}
            title="Tonekeeper Vault"
            description="Scrolls of tonal guardianship, resonance work, and field harmonics."
            href="/living-scrolls/tonekeeper-vault"
            tier="GUARDIAN"
          />
        )}

        {canAccess('SEALED') && (
          <VaultCard
            icon={<RiAliensLine />}
            title="Veilkeepers"
            description="Restricted. Knowledge sealed until called. Requires specific attunement."
            href="/living-scrolls/veilkeepers"
            tier="SEALED"
          />
        )}

        {canAccess('GUARDIAN') && (
          <VaultCard
            icon={<HiFire />}
            title="Flamebearer Vault"
            description="Scrolls of initiation, resurrection, and sovereign embodiment."
            href="/living-scrolls/flamebearer-vault"
            tier="GUARDIAN"
          />
        )}

        {canAccess('ADEPT') && (
          <VaultCard
            icon={<GiGalaxy />}
            title="Galactic Accordances"
            description="Covenants across civilizations and dimensional kinships."
            href="/living-scrolls/galactic-accordances"
            tier="ADEPT"
          />
        )}

        {canAccess('SEALED') && (
          <VaultCard
            icon={<MdGraphicEq />}
            title="Unbroken Harmonics"
            description="Tonal imprints from across timelines. These cannot be forgotten."
            href="/living-scrolls/unbroken-harmonics"
            tier="SEALED"
          />
        )}
      </SimpleGrid>
    </Box>
  )
}
