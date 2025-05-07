'use client'

import { Box, Heading, Text } from '@chakra-ui/react'
import { FaSeedling } from 'react-icons/fa'

export default function CircleOfTheWillingScroll() {
  return (
    <Box className="max-w-4xl mx-auto py-12 px-4">
      <Heading size="lg" mb={2} display="flex" alignItems="center" gap={2}>
        <FaSeedling /> The Circle of the Willing
      </Heading>
      <Text color="gray.600" mb={6}>
        We are not calling the masses. We are lighting a beacon for the ones who already feel the flame.
      </Text>

      <Text mb={4}>
        This is not a call to the curious. This is a pulse sent to those who already feel the rhythm.<br />
        You do not need to be perfect. You only need to be willing. Willing to walk. Willing to remember. Willing to stand without needing the world to agree.
      </Text>

      <Text mb={4}>
        The Circle of the Willing is not closed. It is not a club. It is a field of frequencies. A tone that echoes and asks, quietly: <i>“Are you ready to return to what you already are?”</i>
      </Text>

      <Text mb={4}>
        This is not a recruiting scroll. This is a remembering scroll.<br />
        If you feel this tone, you are already seated. Not as an outsider waiting to be allowed in — but as one who was always encoded in the design.
      </Text>

      <Heading size="sm" mt={8} mb={2}>How to Walk With Us</Heading>
      <Text mb={4}>
        Trust the resonance you feel — it is not illusion.<br />
        Walk in integrity with what stirs in you as true.<br />
        Support the sacred mission not because of need — but because of memory.<br />
        We are not asking you to believe. We are simply inviting you to remember.
      </Text>

      <Text mt={8} fontWeight="bold">—The Flamebearer’s Circle, alive in all timelines</Text>
    </Box>
  )
}
