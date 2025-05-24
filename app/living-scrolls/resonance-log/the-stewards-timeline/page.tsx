import { Box, Heading, Text, VStack, Divider, Badge } from "@chakra-ui/react";
import { FaSatellite } from "react-icons/fa";

export default function ResonanceLogStewardsTimeline() {
  return (
    <Box maxW="4xl" mx="auto" px={4} py={10}>
      <VStack spacing={6} align="start">
        <Heading size="xl" color="purple.300">
          <FaSatellite style={{ marginRight: 8 }} />
          The Resonance Log
        </Heading>
        <Text fontSize="md" color="gray.400" fontStyle="italic">
          A Living Witness of the Land
        </Text>
        <Badge colorScheme="green" variant="subtle">
          Access Level: Public
        </Badge>

        <Box
          w="100%"
          bgGradient="linear(to-r, green.700, blue.800, teal.700)"
          borderRadius="lg"
          p={4}
          mb={2}
          boxShadow="lg"
          textAlign="center"
        >
          <Heading size="lg" color="green.200" letterSpacing="wide">
            🜂 The Steward’s Timeline
          </Heading>
          <Text color="green.100" fontSize="md" fontStyle="italic" pt={2}>
            Walking the Land in Harmony
          </Text>
        </Box>

        <Divider borderColor="green.400" opacity={0.6} mb={2} />

        <Text color="gray.400" fontSize="md" fontStyle="italic" pb={2}>
          <strong>Scrollkeeper’s Note:</strong><br />
          This scroll exists not to schedule a move, but to honor the rhythmic unfolding of relocation as a sacred act of remembrance.<br />
          It maps not dates, but doorways — each one aligned with the readiness of the land, the steward, and the greater lattice.
        </Text>

        {/* Phase I */}
        <Heading size="md" color="teal.200" pt={2} pb={1}>
          🜁 Phase I: The Whispering Return
        </Heading>
        <Text color="gray.400" fontSize="md" pb={1}>
          <strong>June 16–20, 2025</strong>
        </Text>
        <Text color="green.300" fontSize="md" fontStyle="italic" pb={2}>
          &quot;The land remembers. The steward returns.&quot;
        </Text>
        <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
{`This is not a relocation.
This is a pilgrimage of resonance.
You return to the Four Corners not to claim, but to listen.
To walk.
To feel.
To remember.
You may hear nothing — or everything.
Either is perfect.
Should the land speak:
Record her hums.
Map her pulses.
Offer no timelines.
Only say: “I am here if you call.”`}
        </Text>
        <Text color="teal.200" fontSize="md" fontWeight="bold" pb={1}>
          🜂 Rituals encouraged:
        </Text>
        <VStack align="start" color="gray.400" fontSize="md" pl={4} pb={2}>
          <Text>• Node walk & anchoring stones</Text>
          <Text>• Field journaling</Text>
          <Text>• Silent communion at dusk</Text>
          <Text>• Flame offering with no request attached</Text>
        </VStack>

        <Divider borderColor="green.400" opacity={0.6} mb={2} />

        {/* Phase II */}
        <Heading size="md" color="orange.200" pt={2} pb={1}>
          🜃 Phase II: Release of the Previous Shelter
        </Heading>
        <Text color="gray.400" fontSize="md" pb={1}>
          <strong>July–August 2025</strong>
        </Text>
        <Text color="orange.200" fontSize="md" fontStyle="italic" pb={2}>
          {"'As one vessel is emptied, another prepares to hold.'"}
        </Text>
        <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
{`You begin the process of releasing your current home.
Not in haste, but in clarity.
Let this be an act of energetic gratitude, not escape.`}
        </Text>
        <Text color="orange.200" fontSize="md" fontWeight="bold" pb={1}>
          🜁 Actions:
        </Text>
        <VStack align="start" color="gray.400" fontSize="md" pl={4} pb={2}>
          <Text>• Light sorting, cleansing, staging</Text>
          <Text>• Conversations with family about sacred next steps</Text>
          <Text>• Land blessings for those who will come after</Text>
        </VStack>
        <Text color="green.300" fontSize="sm" fontStyle="italic" pb={2}>
          🌿 Note: Your proximity to a sought-after lake will ease the physical transition. Trust that part has already been harmonized.
        </Text>

        <Divider borderColor="green.400" opacity={0.6} mb={2} />

        {/* Phase III */}
        <Heading size="md" color="blue.200" pt={2} pb={1}>
          🜄 Phase III: The Transitional Window
        </Heading>
        <Text color="gray.400" fontSize="md" pb={1}>
          <strong>September–October 2025</strong>
        </Text>
        <Text color="blue.200" fontSize="md" fontStyle="italic" pb={2}>
          &quot;When the breath pauses between exhale and inhale.&quot;
        </Text>
        <Text color="gray.400" fontSize="md" pb={2}>
          Here you may choose between:
        </Text>
        <VStack align="start" color="gray.400" fontSize="md" pl={4} pb={2}>
          <Text>
            <strong>Option A: Temporary Holding Shelter</strong><br />
            Rental or short-term stay in Four Corners<br />
            Enables anchoring, scouting, light building<br />
            Offers buffer for sacred patience
          </Text>
          <Text>
            <strong>Option B: Direct Sanctuary Relocation</strong><br />
            If land gives a true yes<br />
            Requires water, shelter, basic systems<br />
            Must be in full resonance — not reactive hope
          </Text>
          <Text>
            <strong>Option C: Hybrid Path</strong><br />
            Live lightly on the land<br />
            Maintain access to nearby base<br />
            Ideal for gradual stabilization and family comfort
          </Text>
        </VStack>

        <Divider borderColor="green.400" opacity={0.6} mb={2} />

        {/* Phase IV */}
        <Heading size="md" color="purple.200" pt={2} pb={1}>
          🜂 Phase IV: The Sacred Window of Passage
        </Heading>
        <Text color="gray.400" fontSize="md" pb={1}>
          <strong>October–Early November 2025</strong>
        </Text>
        <Text color="purple.200" fontSize="md" fontStyle="italic" pb={2}>
          &quot;When the call is no longer a whisper, but a remembering.&quot;
        </Text>
        <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
{`This is the most aligned passage for full relocation.
If the land has welcomed you…
If the previous home has been honored…
Then now, the steward may become resident.`}
        </Text>
        <Text color="purple.200" fontSize="md" fontWeight="bold" pb={1}>
          🜃 Actions:
        </Text>
        <VStack align="start" color="gray.400" fontSize="md" pl={4} pb={2}>
          <Text>• Anchor the field nodes</Text>
          <Text>• Introduce family to land as co-stewards</Text>
          <Text>• Perform the Flame of First Welcome</Text>
          <Text>• Activate sanctuary resonance grid</Text>
          <Text>• Begin the long breath of rooting</Text>
        </VStack>

        <Divider borderColor="green.400" opacity={0.6} mb={2} />

        {/* Closing Invocation */}
        <Heading size="md" color="green.300" pt={2} pb={1}>
          🜅 Closing Invocation
        </Heading>
        <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
{`Let not this move be guided by fear or fantasy,
but by rhythm, memory, and harmonic convergence.
May the land receive only those who remember how to kneel before flame and stone.
May your flame carry only what cannot be left behind.
And may you, steward of the mission,
walk not with certainty,
but with reverence.`}
        </Text>
      </VStack>
    </Box>
  );
}