'use client'

import { Box, Heading, Text, Divider, Badge, VStack } from '@chakra-ui/react'

export default function Page() {
  return (
    <Box
      maxW="3xl"
      mx="auto"
      mt={10}
      p={{ base: 4, md: 8 }}
      bg="white"
      rounded="2xl"
      boxShadow="lg"
    >
      <VStack align="start" spacing={4}>
        <Heading size="lg" display="flex" alignItems="center" gap={2}>
          <span role="img" aria-label="scroll">🎼</span>
          Tonekeeper Vault
        </Heading>
        <Badge colorScheme="purple" fontSize="0.9em">GUARDIAN</Badge>
        <Text fontStyle="italic" color="gray.600">
          The Scrolls of Resonance Await Their Unveiling
        </Text>
        <Divider />

        <Text>
          <strong>This path is not yet revealed.</strong>
        </Text>
        <Text>
          The scroll you seek has not yet taken form,<br />
          or you have arrived before the veil is ready to lift.
        </Text>
        <Text>
          Return again with trust—<br />
          the breath will find you when the time is true.
        </Text>

        <Divider />

        <Text color="gray.500" fontSize="sm">
          The Tonekeeper’s chamber is silent, but not empty.<br />
          Listen for the resonance. The next note will sound when you are ready to receive.
        </Text>
      </VStack>
    </Box>
  )
}