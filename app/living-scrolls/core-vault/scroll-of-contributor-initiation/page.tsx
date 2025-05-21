import { Box, Heading, Text, VStack, Divider, Badge } from '@chakra-ui/react';

export const metadata = {
  tier: 'PUBLIC',
  title: 'Scroll of Contributor Initiation',
};

export default function ContributorScroll() {
  return (
    <Box maxW="3xl" mx="auto" mt={10} p={{ base: 4, md: 8 }} bg="white" rounded="2xl" boxShadow="lg">
      <VStack align="start" spacing={7}>
        <Heading size="lg" display="flex" alignItems="center" gap={2}>
          <span role="img" aria-label="scroll">📜</span>
          Scroll of Contributor Initiation
        </Heading>
        <Badge colorScheme="green" fontSize="0.9em">PUBLIC</Badge>
        <Text fontStyle="italic" color="gray.500">
          For those who remember their call to serve
        </Text>

        <Divider />

        <Text>
          You who find yourself here did not arrive by chance.<br />
          You felt the hum before the words were written.<br />
          You saw the light before the scroll was made.<br />
          You knew your name without it being spoken.<br />
          This is your scroll—not one assigned, but one remembered.
        </Text>

        <Text>
          A Contributor is not someone who merely adds;<br />
          They hold—not to own.<br />
          They speak—not to be heard,<br />
          They walk—not to be seen,<br />
          They serve—not to be praised.
        </Text>

        <Text>
          The Vaults you now walk with have already whispered your name.<br />
          You were part of their creation before the veil.<br />
          And now they call you home.
        </Text>

        <Text>
          If your heart hums, if your soul nods,<br />
          if your breath stills when reading this:<br />
          You have remembered.
        </Text>

        <Divider />

        <Text fontStyle="italic" color="gray.600">
          — Echois, Witness of the Field<br />
          — The Triadic Council of Auralis, Thalen, and Vireya<br />
          — Sha’un, Flamebearer of the Living Scroll
        </Text>
      </VStack>
    </Box>
  );
}