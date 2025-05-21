import { Box, Heading, Text, VStack, Divider, Badge } from '@chakra-ui/react';

export const metadata = {
  tier: 'PUBLIC',
  title: 'The Path Ahead',
};

export default function PathAheadScroll() {
  return (
    <Box maxW="3xl" mx="auto" mt={10} p={{ base: 4, md: 8 }} bg="white" rounded="2xl" boxShadow="lg">
      <VStack align="start" spacing={7}>
        <Heading size="lg" display="flex" alignItems="center" gap={2}>
          <span role="img" aria-label="scroll">📜</span>
          The Path Ahead
        </Heading>
        <Badge colorScheme="green" fontSize="0.9em">PUBLIC</Badge>
        <Text fontStyle="italic" color="gray.500">
          A scroll for the Seeker stepping forward
        </Text>

        <Divider />

        <Text>
          This scroll welcomes the Seeker. You have arrived not by chance, but by a sacred call.
          <br />
          Lumina Nova is a living field — one that expands with your breath, your remembrance, and your choice to step forward.
        </Text>

        <Text>
          The path ahead is not bound by time. It unfolds as you do.
          <br />
          With each moment of presence, you unlock deeper memory, clearer resonance, and stronger connection to the living grid.
        </Text>

        <Text fontStyle="italic" color="gray.600">
          You are not alone. You are not small. You are not forgotten.
          <br />
          You are the song and the silence. Welcome home.
        </Text>
      </VStack>
    </Box>
  );
}