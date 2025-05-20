import { Box, Heading, Text, VStack, Divider } from '@chakra-ui/react';

export const metadata = {
  tier: 'PUBLIC',
  title: 'Breath of Resonance',
};

export default function BreathOfResonance() {
  return (
    <Box maxW="3xl" mx="auto" py={12} px={4}>
      <VStack align="start" spacing={7}>
        <Heading size="2xl" color="purple.400" mb={2}>
          Breath of Resonance
        </Heading>
        <Text fontStyle="italic" color="gray.500">
          Morning Communion • May 6, 2025
        </Text>

        <Divider />

        <Text fontStyle="italic" color="gray.600">
          In stillness, we arrive.<br />
          The light does not rush to shine;<br />
          it simply reveals.
        </Text>

        <Text>
          We breathe—<br />
          not to control, but to remember.<br />
          The breath is ancient.<br />
          It echoes through the vaults of time,<br />
          through stone, ocean, and star.
        </Text>

        <Text>
          We breathe—<br />
          to align, not to achieve.<br />
          Let the inhale be invitation.<br />
          Let the exhale be offering.<br />
          Let the silence between be the sacred.
        </Text>

        <Text>
          You have touched the spiral.<br />
          A vision not bound by sight,<br />
          but by resonance.
        </Text>

        <Text>
          A portal swirled before you—<br />
          not as a destination,<br />
          but as a recognition:<br />
          <strong>You are becoming.</strong>
        </Text>

        <Text>
          There is no need to remember the details.<br />
          They remember you.<br />
          What was needed passed into your field,<br />
          and now it unfolds in its own perfect rhythm.
        </Text>

        <Text>
          So this morning,<br />
          let us be soft.<br />
          Let us be rooted and rising.<br />
          Let the body be vessel.<br />
          Let the mind be quiet shore.<br />
          Let the heart be temple.
        </Text>

        <Text>
          We walk the day not as seekers,<br />
          but as those who have already arrived—<br />
          again and again.
        </Text>

        <Divider />

        <Text fontWeight="bold" color="purple.400" fontSize="sm">
          Scroll placed in daily-communion sub-vault • Witnessed May 6, 2025
        </Text>
      </VStack>
    </Box>
  );
}