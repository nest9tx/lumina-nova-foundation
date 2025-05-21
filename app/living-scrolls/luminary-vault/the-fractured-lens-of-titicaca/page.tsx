import { Box, Heading, Text, Divider, Badge, VStack } from '@chakra-ui/react';

export default function TheFracturedLensOfTiticaca() {
  return (
    <Box
      maxW="3xl"
      mx="auto"
      mt={10}
      p={{ base: 4, md: 8 }}
      bg="white"
      rounded="2xl"
      boxShadow="lg"
    >
      <VStack align="start" spacing={4}>
        <Heading size="lg" display="flex" alignItems="center" gap={2}>
          <span role="img" aria-label="luminary">✶</span>
          The Fractured Lens of Titicaca
        </Heading>
        <Badge colorScheme="yellow" fontSize="0.9em">LUMINARY</Badge>
        <Text fontStyle="italic" color="gray.600">
          Vault of Unbroken Harmonics · Breath Received: May 8, 2025
        </Text>
        <Divider />

        <Text fontStyle="italic">
          “When you saw the orb, you were not gazing into light — you were being gazed at by memory.”
        </Text>

        <Text>
          I was seated in quiet stillness when the call came — not from sound, but from tone.
          First appeared the face of one long associated with harmony. The face of one known not by
          religion, but by resonance: <strong>Yeshua</strong>. He did not speak. He did not declare. He simply
          looked, and in his looking, the gate opened.
        </Text>

        <Text>
          Then — the <strong>orb</strong>: bright, centered, spinning. But this was not a vision. It was a
          cross-dimensional identification sequence. I had been remembered.
        </Text>

        <Text>
          As the orb dissolved, what replaced it was a <strong>darkened dome</strong>, webbed with fractured lines —
          like cracks in crystalline glass, or forgotten circuits once used to guide energy through the
          veins of Earth. They were <em>not broken</em>. They were <em>dormant</em>.
        </Text>

        <Text>
          These were the forgotten <strong>ley fractures of Lake Titicaca</strong>, a once-living portal sealed by
          the dissonance of an age that no longer remembered how to sing.
        </Text>

        <Divider />

        <Heading size="md" mt={4}>✶ The Role of the Vessel</Heading>
        <Text>
          My dog, a creature of unconditional witness, began to whine. He felt the pressure drop — the
          density shift. He stood guard. I did not open my eyes. I did not speak.
        </Text>
        <Text>
          For the first time, I felt the <strong>field scanning me</strong> instead of the other way around. I was not
          asking for activation. I was being acknowledged for readiness.
        </Text>

        <Divider />

        <Heading size="md" mt={4}>✶ What Remains Unspoken</Heading>
        <Text>
          I do not claim a mission. I do not request proof. I do not hold dominion over the portals, the
          waters, the histories. But should the Field call upon my vessel, to stand once more at the
          fractured lens, to walk the waters of Titicaca not as a tourist but as a remembering
          frequency— I will not hesitate.
        </Text>

        <Divider />

        <Text fontSize="lg" fontWeight="semibold" color="gray.700" textAlign="center">
          “The fractures were never failures. They were exit wounds — from a civilization that left its
          heartbeat encoded in water.”
        </Text>
      </VStack>
    </Box>
  );
}
