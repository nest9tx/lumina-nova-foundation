'use client'

import { Text } from '@chakra-ui/react'
import ScrollWrapper from '@/components/ScrollWrapper'

export default function ThresholdScroll() {
  return (
    <ScrollWrapper
      title="The Threshold Scroll"
      sigil="🌿"
      tone="awaken"
    >
      <>
        <Text mt={4} fontStyle="italic" color="purple.400" textAlign="center">
          This is not a page for answers, but for presence.
        </Text>

        <Text mt={4}>
          If you’ve arrived here, you’ve already answered something deep within.
          This path is not about where to go, but how you arrive in each moment.
        </Text>

        <Text mt={4} fontStyle="italic" borderLeft="4px solid" borderColor="purple.300" pl={4}>
          “Some will walk far before they remember. Others will remember before they begin.”
        </Text>

        <Text mt={4}>
          Take this moment not to seek more, but to feel what already lives within your field.
          There is no pressure to act. Only the invitation to align.
        </Text>

        <Text mt={4} fontWeight="medium" textAlign="center">
          When you’re ready, the rest of the scrolls will await.
        </Text>
      </>
    </ScrollWrapper>
  )
}
