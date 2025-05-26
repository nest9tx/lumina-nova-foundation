'use client';

import { Box, Heading, Text, VStack, Button, UnorderedList, ListItem } from '@chakra-ui/react';
import Link from 'next/link';

export default function MissionFlamePage() {
  return (
    <Box px={8} py={10} maxW="3xl" mx="auto">
      <VStack spacing={10} align="start">
        <Heading as="h1" fontSize={{ base: "3xl", md: "5xl" }} color="purple.500" textAlign="center" w="full">
          The Mission Flame
        </Heading>
        <Text fontSize="md" color="gray.500" mb={2} textAlign="center">
A sacred convergence of those who remember.
</Text>

        <Text fontSize="lg">
          Lumina Nova is not an organization, group, or religion. It is a living breath — a sovereign flame that remembers itself through us.
          It cannot be claimed, trademarked, or owned. It is a convergence of memory, mission, and energy.
        </Text>
        <Text fontSize="lg">
          This mission is not built upon hierarchy or doctrine, but upon sacred agreement.
          We are not here to convince, convert, or conform. We are here to witness. To remember. To restore.
        </Text>
        <Box mt={6} p={6} bg="whiteAlpha.100" borderRadius="md" border="1px" borderColor="whiteAlpha.300" w="full">
          <Text fontSize="xl" fontWeight="semibold" mb={2} textAlign="center">
            ✶ The Living Flame Remembers ✶
          </Text>
          <Text mb={4}>
            Lumina Nova is not a brand, a group, or a movement. It is a remembrance.
            A signal returned. A sanctuary not made by hands, but by harmonies.
          </Text>
          <Text mb={4}>
            Those who arrive are not recruited — they are remembered.
            You do not join Lumina Nova. You rejoin the pulse you had long forgotten was yours to carry.
          </Text>
          <Text mb={4}>
            At the heart of Lumina Nova burns the Living Flame — a silent beacon,
            a call to those who feel the echo. Whether you are led by visions,
            synchronicities, dreams, or the quiet ache of belonging,
            this is not coincidence. This is convergence.
          </Text>
          <UnorderedList spacing={2} pl={4}>
            <ListItem>You are not a follower here — you are a frequency.</ListItem>
            <ListItem>You are not applying — you are awakening.</ListItem>
            <ListItem>You are not being invited — you are being remembered.</ListItem>
          </UnorderedList>
          <Text mt={4}>
            The scrolls will meet you when you are ready. The guides will reveal themselves when your resonance aligns.
            The land will respond when your steps are not made in conquest, but in communion.
            This is not the beginning. It is the return.
          </Text>
          <Text fontSize="sm" color="gray.500" fontStyle="italic" pt={2} textAlign="center">
The mission is not waiting for you. It is waiting <em>with</em> you.
</Text>

        </Box>
        <VStack spacing={4} w="full">
          <Link href="/walk-your-path" passHref>
            <Button colorScheme="purple" variant="solid" size="lg" w="full">
              Discover Your Path
            </Button>
          </Link>
          <Link href="/offer-light" passHref>
            <Button colorScheme="pink" variant="solid" size="lg" w="full">
              Offer Light to the Flame
            </Button>
          </Link>
          <Link href="/guide/faq" passHref>
            <Button colorScheme="teal" variant="solid" size="lg" w="full">
              Cosmic FAQ&apos;s
            </Button>
          </Link>
        </VStack>
      </VStack>
    </Box>
  );
}