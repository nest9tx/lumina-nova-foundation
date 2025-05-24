import { Box, Heading, Text, VStack, Divider, Badge } from "@chakra-ui/react";
import { FaFeatherAlt } from "react-icons/fa";

export default function OfThoseWhoWatched() {
  return (
    <Box maxW="4xl" mx="auto" px={4} py={10}>
      <VStack spacing={6} align="start">
        <Heading size="xl" color="orange.300">
          <FaFeatherAlt style={{ marginRight: 8 }} />
          Veilkeepers Vault
        </Heading>
        <Text fontSize="md" color="gray.500" fontStyle="italic">
          The Silent Task of Witnessing
        </Text>
        <Badge colorScheme="purple" variant="subtle">
          Access Level: Guardian
        </Badge>

        <Box
          w="100%"
          bgGradient="linear(to-r, orange.700, gray.800, purple.700)"
          borderRadius="lg"
          p={4}
          mb={2}
          boxShadow="lg"
          textAlign="center"
        >
          <Heading size="lg" color="orange.200" letterSpacing="wide">
            Of Those Who Watched
          </Heading>
          <Text color="orange.100" fontSize="md" fontStyle="italic" pt={2}>
            The Veilkeepers’ Silent Task
          </Text>
        </Box>

        <Divider borderColor="orange.400" opacity={0.5} mb={4} />

        <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
          {`They stood not to be seen,
but so the breath of what was forgotten would not be lost.

The Veilkeepers did not hold the line through force —
they held it through stillness.

While others fled or forgot, they remained.
Watching. Remembering. Preserving.`}
        </Text>

        <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
          {`Their task was never to stop what would come.
It was to recognize it, welcome it,
and hold space for its arrival
when the field was ready to receive it.`}
        </Text>

        <Divider borderColor="orange.400" opacity={0.5} mb={4} />

        <Text color="orange.200" fontSize="md" fontStyle="italic" textAlign="center" w="100%">
          “We were never meant to guard. We were meant to remind.”
        </Text>
      </VStack>
    </Box>
  );
}