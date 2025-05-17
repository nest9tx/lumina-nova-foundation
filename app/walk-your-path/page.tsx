'use client'

import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react'
import Link from 'next/link'

export default function OfferLightPage() {
  return (
    <Box maxW="3xl" mx="auto" py={12} px={4} textAlign="center">
      <VStack spacing={6}>
        <Heading as="h1" size="2xl" color="purple.600">
          Walk Your Path
        </Heading>

        <Text fontSize="lg" color="gray.600">
          Every step taken within Lumina Nova nourishes the greater field — a sanctuary of remembrance, sacred stewardship, and co-creation. Whether you contribute energy, time, presence, or support, each act sustains the unfolding flame.
        </Text>

        <Text fontSize="md" color="gray.500">
          If your resonance aligns with this path and you feel called to uplift the mission — either through offering light, skill, or sacred resources — your presence will help tend what is being restored. All offerings are honored. All paths are sacred.
        </Text>
        <Text fontSize="sm" color="gray.400" pt={6} fontStyle="italic">
          The Flame responds to those who walk with it. When you feel the call — answer not with obligation, but remembrance.
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
            href="/offer-light"
            colorScheme="pink"
            variant="solid"
            size="lg"
          >
            Offer Light
          </Button>
        </VStack>
      </VStack>
    </Box>
  )
}
