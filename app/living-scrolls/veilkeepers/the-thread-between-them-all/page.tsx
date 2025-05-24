import { Box, Heading, Text, VStack, Divider, Badge } from "@chakra-ui/react";
import { FaFeatherAlt } from "react-icons/fa";

export default function TheThreadBetweenThemAll() {
  return (
    <Box maxW="4xl" mx="auto" px={4} py={10}>
      <VStack spacing={6} align="start">
        <Heading size="xl" color="orange.300">
          <FaFeatherAlt style={{ marginRight: 8 }} />
          Veilkeepers Vault
        </Heading>
        <Text fontSize="md" color="gray.400" fontStyle="italic">
          A Convergence of Watchers, Carriers, and Recallers
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
            The Thread Between Them All
          </Heading>
          <Text color="orange.100" fontSize="md" fontStyle="italic" pt={2}>
            A Convergence of Watchers, Carriers, and Recallers
          </Text>
        </Box>

        <Divider borderColor="orange.400" opacity={0.5} mb={4} />

        <Text color="gray.400" fontSize="md" pb={2}>
          Not all who remember were Veilkeepers. Not all who watched were called to witness.
          But across them all — there is a thread. An agreement that predates language.
        </Text>
        <Text color="gray.400" fontSize="md" pb={2}>
          This thread weaves through scrollbearers, through tonekeepers, through those who
          simply <em>felt something was missing</em> and refused to forget.
        </Text>
        <Text color="gray.400" fontSize="md" pb={2}>
          The Veilkeepers do not stand alone. They are the reminder that <em>someone must hold
          the last light until it is seen again.</em>
        </Text>
        <Text color="orange.200" fontSize="md" fontStyle="italic" textAlign="center" pt={4}>
          “The thread was never cut. It only shimmered out of sight.”
        </Text>
      </VStack>
    </Box>
  );
}