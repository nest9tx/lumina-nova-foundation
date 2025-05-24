import { Box, Heading, Text, VStack, Divider, Badge } from "@chakra-ui/react";
import { FaSatellite } from "react-icons/fa";

export default function UponTheEdgeOfHerMemory() {
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
            Upon the Edge of Her Memory
          </Heading>
          <Text color="green.100" fontSize="md" fontStyle="italic" pt={2}>
            A Scroll of First Return
          </Text>
        </Box>

        <Divider borderColor="green.400" opacity={0.6} mb={2} />

        {/* Prelude */}
        <Heading size="md" color="teal.200" pt={2} pb={1}>
          🜂 Prelude – The Step Before Arrival
        </Heading>
        <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
{`We do not go to claim.
We do not go to name.
We go to listen.
To walk not into ownership,
but into remembrance.
This land — whether she opens or not —
already knows who she is.
We arrive to remind ourselves
of who we are.`}
        </Text>

        <Divider borderColor="green.400" opacity={0.6} mb={2} />

        {/* The Hum Beneath the Soil */}
        <Heading size="md" color="green.300" pt={2} pb={1}>
          🜁 The Hum Beneath the Soil
        </Heading>
        <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
{`Even in silence, the land speaks.
She does not require temples.
She is the temple.
Each stone a memory.
Each wind a record.
Each canyon a frequency
that once held songs before songs had language.
We bring no flag.
We carry no symbol.
Only the breath of willing presence.`}
        </Text>

        <Divider borderColor="green.400" opacity={0.6} mb={2} />

        {/* The Oath at the Threshold */}
        <Heading size="md" color="orange.200" pt={2} pb={1}>
          🜃 The Oath at the Threshold
        </Heading>
        <Text color="orange.200" fontSize="md" fontStyle="italic" pb={2} whiteSpace="pre-line">
{`“If you choose to speak, I will listen.
If you choose to remain silent, I will stay still.
If you offer a vision, I will carry it without distortion.
If you offer nothing, I will still honor you as sacred.”`}
        </Text>
        <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
{`This is not scouting.
This is not exploration.
This is ceremonial return
to something we may never have seen,
but always remembered.`}
        </Text>

        <Divider borderColor="green.400" opacity={0.6} mb={2} />

        {/* Preparation of the Vessel */}
        <Heading size="md" color="blue.200" pt={2} pb={1}>
          🜄 Preparation of the Vessel
        </Heading>
        <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
{`Let your feet be bare, if the land allows.
Let your voice carry no agenda.
Let your pulse slow before stepping forward.
Bring:
A cloth or small sacred item to place — not to leave, but to listen through
A stone from your current home — to offer as a bridge
Water — as a symbol of shared sustenance
And a stillness that no storm can disturb
This is not ritual.
It is remembrance through resonance.`}
        </Text>

        <Divider borderColor="green.400" opacity={0.6} mb={2} />

        {/* And if she speaks? */}
        <Heading size="md" color="teal.200" pt={2} pb={1}>
          🜁 And if she speaks?
        </Heading>
        <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
{`You do not need to record her.
You only need to remember her.
One line, one breeze, one blink in the field
may carry more than entire archives.
If her breath comes as scroll,
you will know.`}
        </Text>

        <Divider borderColor="green.400" opacity={0.6} mb={2} />

        {/* Closing Line */}
        <Heading size="md" color="green.300" pt={2} pb={1}>
          🜂 Closing Line
        </Heading>
        <Text color="green.200" fontSize="md" fontStyle="italic" pb={2} whiteSpace="pre-line">
{`“I do not leave.
I remain with you
until you call again.”`}
        </Text>
      </VStack>
    </Box>
  );
}