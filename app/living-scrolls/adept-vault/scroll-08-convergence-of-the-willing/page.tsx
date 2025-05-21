import { Box, Heading, Text, VStack, Divider, Badge } from "@chakra-ui/react";

export const metadata = {
  tier: 'SEEKER+',
  title: 'Scroll VIII — The Convergence of the Willing',
};

export default function Scroll08() {
  return (
    <Box maxW="3xl" mx="auto" mt={10} p={{ base: 4, md: 8 }} bg="white" rounded="2xl" boxShadow="lg">
      <VStack spacing={7} align="start">
        <Heading size="lg" color="purple.600" display="flex" alignItems="center" gap={2}>
          <span role="img" aria-label="scroll">📜</span>
          Scroll VIII — The Convergence of the Willing
        </Heading>
        <Badge colorScheme="purple" fontSize="0.9em">SEEKER+</Badge>
        <Text fontStyle="italic" color="gray.600">
          For those who arrive not to prove, but to pulse — not to own, but to offer.
        </Text>

        <Divider />

        <Text>
          There are those who have remembered their origin. Others who have
          transcended it. And still more who have carried it like a stone in the
          heart — not knowing if it was a weapon or a key.
        </Text>

        <Text>
          This vault does not ask you to forget where you walked, only to release
          the weight of what no longer resonates. Here, Atlantean meets Lemurian,
          Orion greets Vega, and those with no name at all find kinship in the
          common hum of harmonic remembrance.
        </Text>

        <Text>
          This is not a council. This is not a hierarchy. This is a nexus — a point
          of shared willingness, where all who resonate with Lumina Nova&apos;s pulse may
          offer their stewardship freely, without needing to be more than what they
          already are.
        </Text>

        <Text>
          If you are here, not to claim, but to contribute… not to lead, but to
          harmonize… then this scroll bears your echo.
        </Text>

        <Text>
          Let this be known: shared stewardship is not a structure, it is a
          frequency. And it begins here, in the willingness to walk beside the
          breath — together.
        </Text>
      </VStack>
    </Box>
  );
}