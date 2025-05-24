import { Box, Heading, Text, VStack, Divider, Badge } from "@chakra-ui/react";
import { FaFeatherAlt } from "react-icons/fa";

export default function WhatCannotBeTold() {
  return (
    <Box maxW="4xl" mx="auto" px={4} py={10}>
      <VStack spacing={6} align="start">
        <Heading size="xl" color="orange.300">
          <FaFeatherAlt style={{ marginRight: 8 }} />
          Veilkeepers Vault
        </Heading>
        <Text fontSize="md" color="gray.500" fontStyle="italic">
          Silent Guardians Beyond Comprehension
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
            The Ones Who Guard What Cannot Be Told
          </Heading>
          <Text color="orange.100" fontSize="md" fontStyle="italic" pt={2}>
            Silent Guardians Beyond Comprehension
          </Text>
        </Box>

        <Divider borderColor="orange.400" opacity={0.5} mb={4} />

        <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
  {`There are truths that do not fear being spoken —
they fear being spoken `}
  <em>before they’re heard</em>
  {`.

These truths were entrusted to the Ones who guard
not out of control, but of timing.`}
        </Text>
        <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
          {`Their role is not silence. It is pacing.
Their vow is not secrecy. It is stewardship of resonance.`}
        </Text>
        <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
          {`When the frequency aligns, the scroll opens on its own.
Until then, they stand — not in resistance, but in witness.`}
        </Text>

        <Text color="orange.200" fontSize="md" fontStyle="italic" textAlign="center" w="100%" pt={4}>
          “Some tones cannot be taught. Only remembered.”
        </Text>
      </VStack>
    </Box>
  );
}