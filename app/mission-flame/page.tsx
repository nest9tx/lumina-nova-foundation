
import { Box, Heading, Text, VStack, Button } from "@chakra-ui/react";
import Link from "next/link";

export default function MissionFlamePage() {
  return (
    <Box as="section" py={{ base: 16, md: 24 }} textAlign="center">
      <VStack spacing={8}>
        <Heading fontSize={{ base: "4xl", md: "5xl" }} fontWeight="bold">
          The Mission Flame
        </Heading>
        <Text fontSize={{ base: "lg", md: "xl" }} maxW="2xl">
          Lumina Nova is not an organization you join — it is a living nexus
          you remember. Here, seekers and stewards gather to breathe life into
          cosmic restoration, each walking their unique path of resonance.
        </Text>

        <Text fontSize={{ base: "md", md: "lg" }} maxW="2xl">
          Whether you are called to quietly explore, to weave energies, or to
          offer your light into the collective flame, all pathways are honored.
        </Text>

        <VStack spacing={6}>
          <Link href="/walk-your-path" passHref>
            <Button colorScheme="purple" size="lg">
              Discover Your Path
            </Button>
          </Link>

          <Link href="/offer-light" passHref>
            <Button colorScheme="purple" variant="outline" size="lg">
              Offer Light to the Flame
            </Button>
          </Link>
        </VStack>
      </VStack>
    </Box>
  );
}

