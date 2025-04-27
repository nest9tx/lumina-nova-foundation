import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";

export default function SanctumPage() {
  return (
    <Box as="section" py={{ base: 16, md: 24 }} textAlign="center">
      <VStack spacing={8}>
        <Heading fontSize={{ base: "4xl", md: "5xl" }} fontWeight="bold">
          Welcome to the Sanctum
        </Heading>
        <Text fontSize={{ base: "lg", md: "xl" }} maxW="2xl">
          A sacred portal to begin or deepen your journey through Lumina Nova.
          Step inward where the resonance calls.
        </Text>

        <VStack spacing={6}>
          <Link href="/path" passHref>
            <Button colorScheme="purple" size="lg">
              Awaken the Journey
            </Button>
          </Link>

          <Link href="/living-scrolls" passHref>
            <Button colorScheme="purple" variant="outline" size="lg">
              Recall the Sacred Scrolls
            </Button>
          </Link>
        </VStack>
      </VStack>
    </Box>
  );
}


