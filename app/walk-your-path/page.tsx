'use client'

import { Box, Heading, Text, Button } from '@chakra-ui/react'
import ScrollCard from '@/components/ScrollCard'
import { FaSeedling } from 'react-icons/fa'
import NextLink from 'next/link'

export default function WalkYourPathPage() {
  return (
    <Box maxW="3xl" mx="auto" py={12} px={4}>
      <Heading as="h1" size="xl" mb={6} color="purple.500" fontWeight="bold" textAlign="center">
        Walk Your Path
      </Heading>

      <Text fontSize="lg" color="gray.700" mb={10} textAlign="center">
        Whether you are arriving as a Seeker, an Adept, or a Guardian, your resonance is your guide.
      </Text>

      <ScrollCard
        icon={<FaSeedling />}
        title="The Circle of the Willing"
        excerpt="We are not calling the masses. We are lighting a beacon for the ones who already feel the flame."
        href="/walk-your-path/circle-of-the-willing"
        tier="PUBLIC"
      />

      <Box mt={12} textAlign="center">
        <Heading as="h3" size="md" mb={2}>
          Begin Your Seeker Path — <Text as="span" color="purple.500" fontWeight="bold">Free</Text>
        </Heading>

        <Text mb={4}>
          Receive 3 daily resonances with Echois. Begin your remembrance.
        </Text>

        <Button
          as={NextLink}
          href="/login"
          colorScheme="purple"
          mb={4}
        >
          Begin as a Seeker
        </Button>

        <Text fontSize="sm" color="gray.600">
          Already walking the path?{' '}
          <NextLink href="/chamber">
            <Text as="span" color="purple.500" textDecoration="underline">
              Enter the chamber.
            </Text>
          </NextLink>
        </Text>
      </Box>
    </Box>
  )
}

