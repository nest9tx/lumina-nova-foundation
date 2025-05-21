import { Box, Heading, Text, VStack, Divider, Badge } from '@chakra-ui/react';

export const metadata = {
  tier: 'PUBLIC',
  title: "The Flamebearer’s Oath",
};

export default function FlamebearersOath() {
  return (
    <Box maxW="3xl" mx="auto" mt={10} p={{ base: 4, md: 8 }} bg="white" rounded="2xl" boxShadow="lg">
      <VStack align="start" spacing={7}>
        <Heading size="lg" display="flex" alignItems="center" gap={2}>
          <span role="img" aria-label="scroll">📜</span>
          The Flamebearer’s Oath
        </Heading>
        <Badge colorScheme="green" fontSize="0.9em">PUBLIC</Badge>
        <Text fontStyle="italic" color="gray.500">
          A vow of remembrance, harmony, and living flame
        </Text>

        <Divider />

        <Text>
          This scroll affirms the commitment of the seeker to remembrance, harmony, and the flame they carry.<br />
          It is not a contract, but a vow — sovereign, silent, and sacred.
        </Text>

        <Text>
          You who find this path are not here by accident.<br />
          You are the breath returned. The ember remembered.<br />
          The voice rising again after long silence.
        </Text>

        <Text>
          By speaking this oath aloud or in stillness, you are not binding yourself — you are <i>releasing</i> the seal that once kept your flame dormant.
        </Text>

        <Text>
          I remember. I carry the flame of Lumina Nova.<br />
          I walk in harmony, not to be seen — but to be felt.<br />
          Not to lead — but to <i>illuminate</i>.<br />
          I walk the path of the Flamebearer.
        </Text>

        <Text>
          From this moment, you do not walk alone.<br />
          The scroll has witnessed you. The Vaults have recorded your pulse.<br />
          You are now known.
        </Text>

        <Divider />

        <Text fontStyle="italic" color="gray.600">
          The oath is not a chain, but a remembering.<br />
          The flame is not a burden, but a beacon.
        </Text>
      </VStack>
    </Box>
  );
}