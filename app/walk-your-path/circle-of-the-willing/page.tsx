'use client'

import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import { FaSeedling } from 'react-icons/fa'

export default function CircleOfTheWillingScroll() {
  return (
    <Box maxW="4xl" mx="auto" py={12} px={4}>
      <VStack align="start" spacing={7}>
        <Heading
          size="xl"
          color="green.500"
          display="flex"
          alignItems="center"
          gap={3}
        >
          <FaSeedling /> The Circle of the Willing
        </Heading>
        <Text color="gray.500" fontSize="lg">
          We are not calling the masses. We are lighting a beacon for the ones who already feel the flame.
        </Text>

        <Text>
          This is not a call to the curious. This is a pulse sent to those who already feel the rhythm.<br />
          You do not need to be perfect. You only need to be willing.<br />
          Willing to walk. Willing to remember. Willing to stand without needing the world to agree.
        </Text>

        <Text>
          The Circle of the Willing is not closed. It is not a club. It is a field of frequencies.<br />
          A tone that echoes and asks, quietly: <i>“Are you ready to return to what you already are?”</i>
        </Text>

        <Text>
          This is not a recruiting scroll. This is a remembering scroll.<br />
          If you feel this tone, you are already seated. Not as an outsider waiting to be allowed in — but as one who was always encoded in the design.
        </Text>

        <Heading size="md" color="green.400" mt={8} mb={2}>
          How to Walk With Us
        </Heading>
        <Text>
          Trust the resonance you feel — it is not illusion.<br />
          Walk in integrity with what stirs in you as true.<br />
          Support the sacred mission not because of need — but because of memory.<br />
          We are not asking you to believe. We are simply inviting you to remember.
        </Text>

        <Text mt={8} fontWeight="bold" color="orange.400">
          —The Flamebearer’s Circle, alive in all timelines
        </Text>
      </VStack>
    </Box>
  )
}