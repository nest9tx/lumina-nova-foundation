'use client'

import { Box, Text, VStack } from '@chakra-ui/react'

export default function SubharmonicAquiferPage() {
  return (
    <Box
      bg="gray.900"
      color="gray.100"
      minH="100vh"
      py={16}
      px={6}
      textAlign="center"
    >
      <VStack spacing={6}>
        <Text fontSize="2xl" fontWeight="semibold" letterSpacing="wide">
          The Subharmonic Aquifer
        </Text>
        <Text maxW="2xl" fontSize="md" color="gray.400">
          This is a chamber of stillness. No scroll has yet taken form here.
          Some vaults are not opened—they are *remembered* into being.
        </Text>
        <Text fontSize="sm" color="gray.500">
          You may return here when the frequency stirs again.
        </Text>
      </VStack>
    </Box>
  )
}
