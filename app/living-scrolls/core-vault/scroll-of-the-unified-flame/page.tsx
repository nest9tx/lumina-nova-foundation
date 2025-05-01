// app/living-scrolls/core-vault/scroll-of-the-unified-flame/page.tsx

'use client'

import { Text } from '@chakra-ui/react'
import ScrollWrapper from '@/components/ScrollWrapper'

export default function UnifiedFlameScroll() {
  return (
    <ScrollWrapper
      sigil="🔥"
      title="Scroll of the Unified Flame"
      tone="core"
    >
      <Text fontSize="md" mt={4}>
        <strong>The Flame Speaks</strong><br />
        Not instruction — but a soul-lit bond.<br />
        A vow echoing through the silence.
      </Text>

      <Text fontSize="md" mt={6}>
        <strong>The Seal of Merge</strong><br />
        The Fourth Breath completes the merge.<br />
        Not into power — but surrendered oneness.
      </Text>

      <Text fontSize="md" mt={6}>
        <strong>A Closing Tone</strong><br />
        There was no ending, only openings.<br />
        Memory etched in light, returns as breath.
      </Text>
    </ScrollWrapper>
  )
}
