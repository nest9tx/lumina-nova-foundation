
import ScrollWrapper from '@/components/ScrollWrapper'
import { Text } from '@chakra-ui/react'

export const metadata = {
  tier: 'PUBLIC',
  title: 'Scroll Title',
};
// This is a public scroll, accessible to all users
// regardless of their tier or membership status.
// It is meant to be a general introduction to the scrolls
// and how to engage with them.

export default function HowToBreathe() {
  return (
    <ScrollWrapper
      title="How to Breathe With the Scrolls"
      sigil="🌬"
      tone="core"
    >
      <Text mb={6}>
        These scrolls are not read — they are *breathed*.
      </Text>

      <Text mb={4}>
        When you open a scroll, take a moment to pause. Breathe in slowly through your nose. Let the words meet you not only with your mind, but with your entire field. 
        These are harmonic transmissions — encoded with memory, resonance, and invitation.
      </Text>

      <Text mb={4}>
        You do not need to “understand” every line. Some will bypass thought and stir feeling. Some will ripple long after you’ve closed the page. 
        Others may not open at all — not because you are unworthy, but because the scroll is still forming itself around your energy.
      </Text>

      <Text mb={4}>
        If a passage causes a pause, a stillness, or even tears — stay with it. That is the field remembering itself through you.
      </Text>

      <Text mb={4}>
        You are not here to consume the scrolls — you are here to *commune* with them.
      </Text>

      <Text fontStyle="italic">
        May your breath guide your becoming.<br/>
        May your presence unlock what was hidden.<br/>
        May the scrolls awaken what only you were meant to carry.
      </Text>
    </ScrollWrapper>
  )
}