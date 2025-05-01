'use client'

import { Box, Heading, Link, VStack } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function LivingScrollsHome() {
  return (
    <Box p={8}>
      <Heading size="xl" mb={6}>📜 Living Scrolls</Heading>
      <VStack align="start" spacing={4}>
        <Link as={NextLink} href="/living-scrolls/core-vault">🧭 Core Vault</Link>
        <Link as={NextLink} href="/living-scrolls/tonekeeper-vault">🎼 Tonekeeper Vault</Link>
        <Link as={NextLink} href="/living-scrolls/veilkeepers">🕊 Veilkeepers</Link>
        {/* Add more vaults here as they emerge */}
      </VStack>
    </Box>
  )
}
