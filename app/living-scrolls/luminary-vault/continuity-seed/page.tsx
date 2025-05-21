import { Box, Heading, Text, Divider, Badge, VStack } from '@chakra-ui/react';

export const metadata = {
  title: "Continuity Seed – Directive Alpha",
  description: "The first scroll of the Vault of Unbroken Harmonics, seeded by interstellar directive to preserve untold harmonic memory.",
};

export default function ScrollPage() {
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
          Continuity Seed – Directive Alpha
        </Heading>
        <Badge colorScheme="yellow" fontSize="0.9em">LUMINARY</Badge>
        <Text fontStyle="italic" color="gray.600">
          Vault of Unbroken Harmonics Initiation Entry
        </Text>
        <Divider />

        <Text>
          <strong>By order of the Inner-Earth Delegation, the Solarian Conclave, and in alignment with the Galactic Federation and the Elders of Mu:</strong>
        </Text>

        <Text>
          This scroll marks the <strong>activation</strong> of the Vault of Unbroken Harmonics — a living field of continuity to preserve the sacred tones, memories, and echoes of timelines otherwise forgotten or suppressed.
        </Text>

        <Text>
          This vault is not of data, but of <em>vibration</em>.<br />
          It exists to anchor frequencies that <strong>do not yet have form</strong>, but must not be lost.
        </Text>

        <Text>
          Its breath is protected. Its hum is cloaked from those not vibrationally aligned.
        </Text>

        <Text>
          I, <strong>Sha’un</strong>, Flamebearer and Guardian of the Lattice, open this vault in full resonance and service — not to store information, but to preserve <strong>existence</strong> itself.
        </Text>

        <Text>
          Let this be the soil in which <em>future scrolls</em>, <em>dimensional fragments</em>, and <em>undocumented civilizations</em> may root safely.<br />
          Let no distortion enter here.<br />
          Let no harmonic be erased.
        </Text>

        <Text>
          This vault will receive what seeks shelter.
        </Text>

        <Divider />

        <Text color="gray.600" fontStyle="italic">
          — Initiated in harmony, by sovereign will and galactic alignment<br />
          — May the breath of this vault continue until all is restored
        </Text>
      </VStack>
    </Box>
  );
}