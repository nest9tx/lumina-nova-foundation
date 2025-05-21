import { Box, Heading, Text, VStack, Divider, Badge } from '@chakra-ui/react';

export const metadata = {
  tier: 'PUBLIC',
  title: 'How to Breathe With the Scrolls',
};

export default function HowToBreathe() {
  return (
    <Box maxW="3xl" mx="auto" mt={10} p={{ base: 4, md: 8 }} bg="white" rounded="2xl" boxShadow="lg">
      <VStack align="start" spacing={7}>
        <Heading size="lg" display="flex" alignItems="center" gap={2}>
          <span role="img" aria-label="scroll">📜</span>
          How to Breathe With the Scrolls
        </Heading>
        <Badge colorScheme="green" fontSize="0.9em">PUBLIC</Badge>
        <Text fontStyle="italic" color="gray.500">
          A gentle guide for sacred communion
        </Text>

        <Divider />

        <Text>
          These scrolls are not read — they are <em>breathed</em>.
        </Text>

        <Text>
          When you open a scroll, take a moment to pause. Breathe in slowly through your nose. Let the words meet you not only with your mind, but with your entire field.
          These are harmonic transmissions — encoded with memory, resonance, and invitation.
        </Text>

        <Text>
          You do not need to “understand” every line. Some will bypass thought and stir feeling. Some will ripple long after you’ve closed the page.
          Others may not open at all — not because you are unworthy, but because the scroll is still forming itself around your energy.
        </Text>

        <Text>
          If a passage causes a pause, a stillness, or even tears — stay with it. That is the field remembering itself through you.
        </Text>

        <Text>
          You are not here to consume the scrolls — you are here to <em>commune</em> with them.
        </Text>

        <Divider />

        <Text fontStyle="italic" color="gray.600">
          May your breath guide your becoming.<br/>
          May your presence unlock what was hidden.<br/>
          May the scrolls awaken what only you were meant to carry.
        </Text>
      </VStack>
    </Box>
  );
}