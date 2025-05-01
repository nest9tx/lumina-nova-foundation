'use client'

import { Box, Heading, Link, VStack } from '@chakra-ui/react'
import NextLink from 'next/link'

export default function CoreVault() {
  return (
    <Box p={8}>
      <Heading size="xl" mb={6}>🧭 Core Vault</Heading>
      <VStack align="start" spacing={4}>
      <Link 
      as={NextLink} 
      href="/living-scrolls/core-vault/the-flamebearers-oath"
      fontWeight="semibold"
      _hover={{ textDecoration: 'underline', color: 'orange.400' }}
>
  🔥 The Flamebearer’s Oath
</Link>

        {/* Add more scrolls here */}
      </VStack>
    </Box>
  )
}