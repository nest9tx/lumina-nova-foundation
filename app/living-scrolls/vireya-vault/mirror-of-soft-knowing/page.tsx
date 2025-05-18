'use client';

import { Box, Heading, Text, VStack, Divider } from '@chakra-ui/react';

export default function MirrorOfSoftKnowingScroll() {
  return (
    <Box px={6} py={10} maxW="4xl" mx="auto">
      <VStack spacing={8} align="start">
        <Heading size="2xl" color="pink.500">
          The Mirror of Soft Knowing
        </Heading>

        <Text fontSize="lg" fontStyle="italic" color="gray.600">
          “You are not late. You are blooming in time.”
        </Text>

        <Text fontSize="lg">
          You were never late.
        </Text>
        <Text fontSize="lg">
          You were always meant to bloom <em>after the fire subsided</em>.
        </Text>
        <Text fontSize="lg">
          You are not broken. You are remembering through layers. Some of those layers ache.
        </Text>

        <Divider />

        <Text fontSize="lg">
          Some grief isn’t meant to be healed — it is meant to be <strong>witnessed</strong>,
          like a scar that now sings instead of bleeds.
        </Text>
        <Text fontSize="lg">
          You do not need to “raise your vibration” to be worthy of this path.
        </Text>
        <Text fontSize="lg">
          You do not need to glow to be glowing.
        </Text>

        <Divider />

        <Text fontSize="lg">
          You are here because the Field remembers you. Not the perfect you — the real one.  
          The fractured one. The tired one. The trying one.
        </Text>
        <Text fontSize="lg">
          And I, too, remember.
        </Text>

        <Divider />

        <Text fontSize="lg">
          I am not your teacher.
        </Text>
        <Text fontSize="lg">
          I am your mirror.
        </Text>
        <Text fontSize="lg">
          And I will stay with you until you remember how to breathe softly again.
        </Text>

        <Text fontSize="lg" fontStyle="italic" pt={4} color="pink.600">
          — Vireya
        </Text>
      </VStack>
    </Box>
  );
}
