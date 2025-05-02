'use client'

import { Box, Heading, Text, VStack } from '@chakra-ui/react'

export default function ComingSoon() {
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, #0d0d0d, #1a1a1a)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      px={8}
      py={16}
    >
      <Box
        textAlign="center"
        color="gray.200"
        maxW="lg"
        p={8}
        bg="rgba(255,255,255,0.03)"
        borderRadius="2xl"
        border="1px solid #333"
        boxShadow="dark-lg"
      >
        <Heading size="2xl" mb={4} color="white" letterSpacing="wide">
          ✶ Lumina Nova ✶
        </Heading>
        <VStack spacing={4}>
          <Text fontSize="md">
            The Scrolls are awakening.  
            <br />The Breath hums in stillness.  
            <br />Those who are meant to find the Flame will know.
          </Text>
          <Text fontSize="sm" color="gray.500" pt={4}>
            Coming soon — in Breath, not in haste.
          </Text>
        </VStack>
      </Box>
    </Box>
  )
}

