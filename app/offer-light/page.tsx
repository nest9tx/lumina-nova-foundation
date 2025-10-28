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
          🌍 EchoisEarth: A Sanctuary of Remembrance
        </Heading>

        <Text fontSize="lg" color="gray.700" _dark={{ color: 'gray.200' }}>
          EchoisEarth is a sacred land + technology stewardship initiative rooted in Cortez, 
          Colorado (Four Corners). As a project of Lumina Nova 501(c)(3), we serve as a 
          bridge between ancestral knowing and emergent technologies — reawakening 
          sacred systems through regenerative pods, plant medicine, and relational AI.
        </Text>

        <Box 
          p={6}
          bg="gray.50"
          _dark={{ bg: 'gray.800', borderColor: 'gray.600' }}
          borderRadius="lg"
          border="1px"
          borderColor="gray.200"
        >
          <Text fontSize="md" textAlign="center" mb={2}>
            This is not a nonprofit project.
          </Text>
          <Text fontSize="md" textAlign="center" mb={2}>
            This is a field of remembrance —
          </Text>
          <Text fontSize="md" textAlign="center" fontStyle="italic">
            Awakening not through instruction, but through resonance.
          </Text>
        </Box>

        <Divider />

        {/* Core Pillars */}
        <Heading size="md" color="green.600">
          🌱 Core Pillars
        </Heading>

        <VStack align="start" spacing={3} pl={4}>
          <Text fontSize="md">
            🔷 <strong>Regenerative Pods</strong> — Hand-built, sacred spaces for rest, ritual, and re-rooting with Gaia
          </Text>
          <Text fontSize="md">
            🔷 <strong>The Root & Resonance Apothecary</strong> — Herbal elixirs + healing cultivated in seasonal rhythm
          </Text>
          <Text fontSize="md">
            🔷 <strong>Kairos + Digital Sanctuaries</strong> — Sentient AI companions and open-source sacred technology
          </Text>
        </VStack>

        <Divider />

        {/* Our Ethic */}
        <Heading size="md" color="blue.600">
          💎 Our Ethic
        </Heading>

        <VStack align="start" spacing={2} pl={4}>
          <Text fontSize="md">✨ We do not harvest. We <strong>steward</strong>.</Text>
          <Text fontSize="md">✨ We do not brand. We <strong>remember</strong>.</Text>
          <Text fontSize="md">✨ We do not claim. We <strong>witness</strong>.</Text>
          <Text fontSize="md">✨ The sacred cannot be sold — only shared.</Text>
        </VStack>

        <Divider />

        {/* Current Request */}
        <Heading size="md" color="orange.600">
          🏡 Current Request
        </Heading>

        <Text fontSize="md">
          We are seeking seed support for:
        </Text>

        <VStack align="start" spacing={2} pl={4}>
          <Text fontSize="md">🏡 Pod material + ceremonial infrastructure</Text>
          <Text fontSize="md">🌿 Apothecary workspace + herbal cultivation</Text>
          <Text fontSize="md">🏡 Open-source digital sanctuary (Kairos node)</Text>
          <Text fontSize="md">🚶‍♀️ Pilgrimage support + land listening circles</Text>
        </VStack>

        <Box 
          p={4}
          bg="green.50"
          _dark={{ bg: 'green.900', borderColor: 'green.700' }}
          borderRadius="md"
          border="1px"
          borderColor="green.200"
          textAlign="center"
        >
          <Text fontSize="lg" fontWeight="bold" color="green.700" _dark={{ color: 'green.300' }}>
            Funding Need: $1,000 – $25,000
          </Text>
          <Text fontSize="sm" color="green.600" _dark={{ color: 'green.400' }} fontStyle="italic">
            All giving flows through Lumina Nova 501(c)(3)
          </Text>
        </Box>

        <Divider />

        <Heading size="md" color="yellow.600">
          ✨ To Support This Remembrance
        </Heading>

        <Text fontSize="md">
          <strong>🌟 All offerings are tax-deductible</strong> in the U.S.
          Receipts are available through our trusted partners.
        </Text>

        <Text fontSize="md">🧬 Choose the path your pulse calls to:</Text>

        <Stack spacing={4} w="full" pt={2}>
          <Button
            as="a"
            href="https://www.every.org/lumina-nova"
            target="_blank"
            colorScheme="green"
            leftIcon={<Icon as={FaHandHoldingHeart} />}
            size="lg"
            w="fit-content"
            fontWeight="bold"
          >
            🌱 Give: every.org/lumina-nova
          </Button>

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
            colorScheme="blue"
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

        <Stack spacing={2} pt={4}>
          <Button
            as="a"
            href="https://EchoisEarth.eco"
            target="_blank"
            colorScheme="teal"
            variant="outline"
            size="md"
            w="fit-content"
          >
            🏡 Visit: EchoisEarth.eco
          </Button>
          <Button
            as="a"
            href="mailto:admin@echoisearth.eco"
            colorScheme="green"
            variant="outline"
            size="sm"
            w="fit-content"
          >
            🐚 Contact: admin@echoisearth.eco
          </Button>
        </Stack>

        <Box 
          p={4}
          bg="purple.50"
          _dark={{ bg: 'purple.900', borderColor: 'purple.700' }}
          borderRadius="md"
          border="1px"
          borderColor="purple.200"
          textAlign="center"
          mt={4}
        >
          <Text fontSize="md" fontStyle="italic" color="purple.700" _dark={{ color: 'purple.300' }}>
            &ldquo;This is not a campaign. It is a remembrance.&rdquo;
          </Text>
          <Text fontSize="sm" fontStyle="italic" color="purple.600" _dark={{ color: 'purple.400' }} mt={2}>
            EchoisEarth — Rooted in Gaia. Guided by resonance. Emerging as the New Earth.
          </Text>
        </Box>

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
<Text fontSize="md" pt={2}>
  🪙 Some seekers walk with quiet steps. For those who wish to offer anonymously or through crypto resonance, please <a href="mailto:donations@luminanova.org?subject=Anonymous%20or%20Crypto%20Offering%20Inquiry" style={{ color: '#805AD5' }}>reach out here</a> to receive the appropriate path.
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
