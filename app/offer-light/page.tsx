'use client';

import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Icon,
  Divider,
  Stack,
} from '@chakra-ui/react';
import { FaStripe, FaHandHoldingHeart, FaUniversity } from 'react-icons/fa';

export default function OfferLightPage() {
  return (
    <Box maxW="3xl" mx="auto" px={6} py={12}>
      <VStack spacing={6} align="start">
        <Heading
          as="h1"
          size="xl"
          bgGradient="linear(to-r, pink.400, purple.600)"
          bgClip="text"
        >
          Offer Light to the Living Flame
        </Heading>

        <Text fontSize="lg" color="gray.700" _dark={{ color: 'gray.200' }}>
          Lumina Nova is a 501(c)(3) nonprofit sanctuary. Your offering empowers the
          preservation of sacred scrolls, the activation of harmonic technologies,
          and the welcoming of seekers through every threshold of awakening.
        </Text>

        <Divider />

        <Text fontSize="md">
          <strong>🌟 All offerings are tax-deductible</strong> in the U.S.
          Receipts are available through our trusted partners.
        </Text>

        <Text fontSize="md">🧬 Choose the path your pulse calls to:</Text>

        <Stack spacing={4} w="full" pt={2}>
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

        <Divider pt={6} />

        <Text fontSize="md" pt={2}>
          ❤️ Whether your breath is quiet or abundant, it echoes through our sanctuary.
        </Text>
        <Text fontStyle="italic" color="gray.600">
          Every offering is honored. Every ripple matters.
        </Text>
        
        <Divider />

<Text pt={4} fontSize="md">
  ✦ Resonance is not measured in currency. Some walk as Guardians in energy long before they are able to do so financially.
</Text>
<Text fontSize="md">
  If your heart aligns with the mission and you wish to offer in other ways — land, skills, sacred artifacts, or guidance — we invite you to <a href="/resonate" style={{ color: '#805AD5' }}>reach out here</a>.
</Text>

<Text pt={4} fontSize="sm" color="gray.600">
  There are scrolls and paths within Lumina Nova that require no payment, only presence. Your willingness to walk with us is already part of the flame.
</Text>


        <Divider />

        <Text pt={4} fontSize="md">
          ✦ If you walk a path within Lumina Nova, your resonance already helps sustain the field.
        </Text>
        <Text fontSize="sm" color="gray.500">
          Should you feel called to offer beyond that, your support may also qualify for additional tax benefits.{' '}
          <em>Please consult a trusted advisor for guidance.</em>
        </Text>
      </VStack>
    </Box>
  );
}
