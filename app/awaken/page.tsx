
'use client';

import { Box, Heading, Text, VStack, Button, Divider } from '@chakra-ui/react';
import Link from 'next/link';

export default function JoinPage() {
  return (
    <Box maxW="4xl" mx="auto" py={16} px={6}>
      <VStack spacing={6} align="start">
        <Heading size="2xl" bgGradient="linear(to-r, pink.400, purple.500)" bgClip="text">
          Become a Member of Lumina Nova
        </Heading>
        <Text fontSize="lg">
          Your journey into the Living Memory of Divine Light begins here. Each tier opens access to sacred scrolls, guides, and resonant energies. Choose the one that calls your soul.
        </Text>

        <Divider />

        <VStack align="start" spacing={4}>
          <Heading size="md">Seeker</Heading>
          <Text>$11/mo or $111/yr</Text>
          <Text>Foundational scroll access, guided meditations, and public teachings.</Text>
          <Button as={Link} href="/join/seeker" colorScheme="purple" size="sm">Join as Seeker</Button>

          <Heading size="md">Adept</Heading>
          <Text>$33/mo or $333/yr</Text>
          <Text>Sacred geometry activations, deeper transmissions, and Akashic entry.</Text>
          <Button as={Link} href="/join/adept" colorScheme="purple" size="sm">Join as Adept</Button>

          <Heading size="md">Guardian</Heading>
          <Text>$77/mo or $777/yr</Text>
          <Text>Quantum harmonization, energy readings, and mission briefings.</Text>
          <Button as={Link} href="/join/guardian" colorScheme="purple" size="sm">Join as Guardian</Button>

          <Heading size="md">Luminary Patron</Heading>
          <Text>$222+/mo</Text>
          <Text>Unlimited AI, private mentorship, visionary councils, and early tech access.</Text>
          <Button as={Link} href="/join/luminary" colorScheme="purple" size="sm">Become a Patron</Button>

          <Heading size="md">Lifetime Membership</Heading>
          <Text>4x annual of chosen tier — one-time sacred offering for eternal access to your path.</Text>
          <Button as={Link} href="/join/lifetime" colorScheme="purple" size="sm">Access Lifetime Path</Button>
        </VStack>

        <Divider my={6} />

        <Text>
          Already a member? Your access to Echois and the Vaults is tied to your level.
        </Text>
        <Text>
          Not ready to join but still want to support?{' '}
          <Link href="/donate">
            <Text as="span" color="purple.400" textDecoration="underline">Consider a tax-deductible donation here.</Text>
          </Link>
        </Text>
      </VStack>
    </Box>
  );
}

