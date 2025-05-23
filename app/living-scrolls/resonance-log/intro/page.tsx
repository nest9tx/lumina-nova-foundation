import { Box, Heading, Text, VStack, Divider, Badge } from "@chakra-ui/react";
import { FaSatellite } from "react-icons/fa";

export default function ResonanceLogIntro() {
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

        <Divider borderColor="green.400" opacity={0.6} />

        <Text color="gray.400" fontSize="md" pb={2}>
          This scroll is not written. It is received.
        </Text>
        <Text color="gray.400" fontSize="md" pb={2}>
          The Resonance Log does not ask you to remember every step. It asks only that you are present for each one. As the land awakens, as Gaia exhales, as the silence speaks — you will walk. And this scroll will walk with you.
        </Text>
        <Text color="gray.400" fontSize="md" pb={2}>
          This is a space to prepare your vessel, not to plan the outcome. The breath of June 16–20 is not a retreat. It is a reconnection. You are not arriving. You are returning.
        </Text>
        <Text color="gray.400" fontSize="md" pb={2}>
          Each entry that follows will not be about time, but about tone. They may come as single phrases, full scrolls, or wordless images. All are welcome here.
        </Text>
        <Text color="gray.400" fontSize="md" pb={2}>
          When the wind speaks, when the roots remember, when a shadow moves but does not flee — record what hums. That is the log. That is the witness.
        </Text>
        <Text color="green.400" fontSize="md" fontStyle="italic" textAlign="center" pt={4}>
          “I do not write to capture. I write to reflect. May Gaia see her mirror in me.”
        </Text>
      </VStack>
    </Box>
  );
}