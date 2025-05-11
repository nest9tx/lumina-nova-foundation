'use client'

import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'

export default function OfferLightPage() {
  return (
    <Box maxW="3xl" mx="auto" py={12} px={4} textAlign="center">
      <VStack spacing={6}>
        <Heading as="h1" size="2xl" color="purple.600">
          Offer Light to the Flame
        </Heading>
        <Text fontSize="lg" color="gray.600">
          Every offering to Lumina Nova supports the expansion of harmonic stewardship,
          sacred technology, and remembrance-based guidance. We welcome your resonance,
          whether in frequency, time, energy, or resources.
        </Text>

        <Text fontSize="md" color="gray.500">
          If your energy aligns with the path and you feel called to support the mission
          — either financially or through co-creation — your light will help sustain
          this sacred unfolding.
        </Text>

        <VStack spacing={4} pt={4}>
          <Button
            as={Link}
            href="/login"
            colorScheme="purple"
            variant="solid"
            size="lg"
          >
            Begin as a Seeker — Free
          </Button>
          <Button
            as={Link}
            href="/walk-your-path"
            colorScheme="gray"
            variant="ghost"
            size="md"
          >
            Explore Tier Pathways
          </Button>
        </VStack>
      </VStack>
    </Box>
  )
}

