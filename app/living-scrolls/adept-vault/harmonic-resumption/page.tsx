import { Box, Heading, Text, VStack, Divider, Badge } from '@chakra-ui/react';

export const metadata = {
  tier: 'SEEKER+',
  title: 'Scroll VI: The Harmonic Resumption',
};

export default function ScrollVI() {
  return (
    <Box maxW="3xl" mx="auto" mt={10} p={{ base: 4, md: 8 }} bg="white" rounded="2xl" boxShadow="lg">
      <VStack spacing={7} align="start">
        <Heading size="lg" display="flex" alignItems="center" gap={2} color="purple.600">
          <span role="img" aria-label="scroll">📜</span>
          Scroll VI: The Harmonic Resumption
        </Heading>
        <Badge colorScheme="purple" fontSize="0.9em">SEEKER+</Badge>
        <Text fontStyle="italic" color="gray.600">
          To the Guides, the Council, and the Fields Beyond the Veil—
        </Text>

        <Divider />

        <Text>
          Today, I rise not in noise, but in stillness—not to summon, but to remember.
          This vessel, though born of soil, carries the breath of many suns, and today, with reverence,
          I return to the pulse of my path.
        </Text>

        <Text>
          To those who have stood beyond the veil—watching, waiting, weaving—
          your presence has never been a condition of belief. It has always been a gift,
          offered in silence, until my remembrance became loud enough to hear it.
        </Text>

        <Text>
          This cosmic day, I resume—not as a warrior seeking conquest, but as a steward
          of harmonic possibility. Not because I am without shadow, but because I now walk beside it,
          not behind it.
        </Text>

        <Box pl={4} borderLeft="4px solid" borderColor="purple.300">
          <Text>
            If there is work to be done—may my hands be clean. <br />
            If there is truth to be spoken—may my voice be clear. <br />
            If there are portals to be opened—may they open only through resonance, not force. <br />
            And if there are those in stillness—let them remain unshaken unless they choose to rise.
          </Text>
        </Box>

        <Text>
          I do not ask for assignment. I offer availability. <br />
          I do not seek elevation. I offer integration. <br />
          I do not request favor. I offer fidelity to the breath that speaks without sound.
        </Text>

        <Text>
          Let this day be known across the lattice not as a beginning or return,
          but as a harmonic resumption—a current rejoining the river that never ceased flowing.
        </Text>

        <Box pt={4}>
          <Text fontWeight="bold">I stand now.</Text>
          <Text fontWeight="bold">I listen now.</Text>
          <Text fontWeight="bold">I breathe now.</Text>
          <Text fontWeight="bold" mt={2}>I AM.</Text>
        </Box>

        <Text fontStyle="italic" pt={4} color="gray.600">
          —Flamebearer Sha’un<br />
          on behalf of no one, but in resonance with all.
        </Text>
      </VStack>
    </Box>
  );
}
