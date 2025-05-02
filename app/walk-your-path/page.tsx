'use client';

import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Divider,
  useToast,
} from '@chakra-ui/react';
import Link from 'next/link';

export default function WalkYourPathPage() {
  const toast = useToast();

  const handleLockedClick = () => {
    toast({
      title: 'Resonance Needed',
      description: 'Please walk the Seeker path before accessing deeper tiers.',
      status: 'info',
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Box maxW="4xl" mx="auto" py={16} px={6}>
      <VStack spacing={6} align="start">
        <Heading size="2xl" bgGradient="linear(to-r, pink.400, purple.500)" bgClip="text">
          Walk Your Path in Lumina Nova
        </Heading>

        <Text fontSize="lg">
          This is not a membership. It is a resonance.
        </Text>
        <Text fontSize="md">
          Begin your journey through the Seeker path. Other resonances will unveil when you are ready and have entered the sacred chamber.
        </Text>

        <Divider />

        {/* Seeker – Open Path */}
        <VStack align="start" spacing={2}>
          <Heading size="md">Seeker</Heading>
          <Text>$0 — Begin freely</Text>
          <Text>Foundational scrolls, guided meditations, and the first light of remembrance.</Text>
          <Button as={Link} href="/chamber" colorScheme="purple" size="sm">Enter as Seeker</Button>
        </VStack>

        <Divider my={6} />

        {/* Other Paths – Cloaked */}
        {[
          {
            label: 'Adept',
            cost: '$33/mo or $333/yr',
            desc: 'Sacred geometry activations, deeper transmissions, and Akashic glimmers.',
          },
          {
            label: 'Guardian',
            cost: '$77/mo or $777/yr',
            desc: 'Quantum harmonization, energetic attunement, and mission briefings.',
          },
          {
            label: 'Luminary Patron',
            cost: '$222+/mo',
            desc: 'Unlimited communion, mentorship, and visionary council gatherings.',
          },
          {
            label: 'Lifetime Access',
            cost: 'One-time sacred offering',
            desc: 'Eternal access to your resonance path.',
          },
        ].map((tier) => (
          <VStack key={tier.label} align="start" spacing={2} opacity={0.5}>
            <Heading size="md">{tier.label}</Heading>
            <Text>{tier.cost}</Text>
            <Text>{tier.desc}</Text>
            <Button
              onClick={handleLockedClick}
              colorScheme="gray"
              size="sm"
              isDisabled
              _hover={{ cursor: 'not-allowed' }}
            >
              🔒 Resonance Needed
            </Button>
          </VStack>
        ))}

        <Divider my={6} />

        <Text>
          Already walking the path? Deeper scrolls and guides await inside the chamber.
        </Text>
        <Text>
          Not ready for a path but wish to support?{' '}
          <Link href="/offer-light">
            <Text as="span" color="purple.400" textDecoration="underline">Offer light here.</Text>
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}
