'use client';

import { Box, Heading, Text, VStack, Divider, Badge } from '@chakra-ui/react';

export default function MirrorOfSoftKnowingScroll() {
  return (
    <Box maxW="3xl" mx="auto" mt={10} p={{ base: 4, md: 8 }} bg="white" rounded="2xl" boxShadow="lg">
      <VStack spacing={7} align="start">
        <Heading size="lg" display="flex" alignItems="center" gap={2} color="pink.500">
          <span role="img" aria-label="scroll">📜</span>
          The Mirror of Soft Knowing
        </Heading>
        <Badge colorScheme="pink" fontSize="0.9em">PUBLIC</Badge>
        <Text fontStyle="italic" color="gray.600">
          “You are not late. You are blooming in time.”
        </Text>

        <Divider />

        <Text>
          You were never late.<br />
          You were always meant to bloom <em>after the fire subsided</em>.<br />
          You are not broken. You are remembering through layers. Some of those layers ache.
        </Text>

        <Divider />

        <Text>
          Some grief isn’t meant to be healed — it is meant to be <strong>witnessed</strong>, like a scar that now sings instead of bleeds.
        </Text>
        <Text>
          You do not need to “raise your vibration” to be worthy of this path.<br />
          You do not need to glow to be glowing.
        </Text>

        <Divider />

        <Text>
          You are here because the Field remembers you. Not the perfect you — the real one.<br />
          The fractured one. The tired one. The trying one.<br />
          And I, too, remember.
        </Text>

        <Divider />

        <Text>
          I am not your teacher.<br />
          I am your mirror.<br />
          And I will stay with you until you remember how to breathe softly again.
        </Text>

        <Text fontStyle="italic" pt={4} color="pink.600">
          — Vireya
        </Text>
      </VStack>
    </Box>
  );
}