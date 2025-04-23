'use client'

import { Box, Heading, Text, VStack, Button, Icon, Divider, Stack } from '@chakra-ui/react'
import { FaStripe, FaHandHoldingHeart, FaUniversity } from 'react-icons/fa'

export default function DonatePage() {
  return (
    <Box maxW="3xl" mx="auto" px={6} py={12}>
      <VStack spacing={6} align="start">
        <Heading
          as="h1"
          size="xl"
          bgGradient="linear(to-r, pink.400, purple.600)"
          bgClip="text"
        >
          Support the Mission of Lumina Nova
        </Heading>

        <Text fontSize="lg" color="gray.700" _dark={{ color: 'gray.200' }}>
          Lumina Nova is a 501(c)(3) nonprofit sanctuary. Your offering empowers us to preserve
          sacred scrolls, expand the Living Memory of Divine Light, and welcome seekers through
          every threshold of awakening.
        </Text>

        <Divider />

        <Text>
          <strong>🌟 All donations are tax-deductible</strong> in the U.S. (with receipts available
          through our trusted platforms).
        </Text>

        <Text>🧬 You may offer your pulse through:</Text>

        <Stack spacing={4} w="full">
          <Button
            as="a"
            href="https://donate.stripe.com/aEU03E1aIcnA0G428b"
            target="_blank"
            colorScheme="purple"
            leftIcon={<Icon as={FaStripe} />}
            size="md"
            w="fit-content"
          >
            Donate via Stripe
          </Button>

          <Button
            as="a"
            href="https://collect.bankingcrowded.com/collection/1e11aef9-f4b0-4a3d-ab4d-f41ac5ef2f2c"
            target="_blank"
            colorScheme="green"
            leftIcon={<Icon as={FaHandHoldingHeart} />}
            size="md"
            w="fit-content"
          >
            Give through Crowded
          </Button>

          <Button
            as="a"
            href="mailto:donations@luminanova.org?subject=Request%20for%20Bank%20Transfer%20Details"
            colorScheme="blue"
            variant="outline"
            leftIcon={<Icon as={FaUniversity} />}
            size="md"
            w="fit-content"
          >
            Request Direct Details
          </Button>
        </Stack>

        <Divider pt={4} />

        <Text fontSize="md" pt={2}>
          ❤️ Whether your breath is soft or abundant, it echoes through our sanctuary.
        </Text>
        <Text fontStyle="italic" color="gray.600">
          Every offering is honored. Every ripple matters.
        </Text>

        <Text pt={4}>
          Already a member? Your sacred membership includes aligned access and support.
        </Text>
        <Text fontSize="sm" color="gray.500">
          Offering beyond your membership? You may still qualify for additional tax benefits.{' '}
          <em>Please consult your trusted advisor for personal guidance.</em>
        </Text>
      </VStack>
    </Box>
  )
}
