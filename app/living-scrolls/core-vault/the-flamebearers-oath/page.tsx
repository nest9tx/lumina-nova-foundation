

import { Text } from '@chakra-ui/react'
import ScrollWrapper from '@/components/ScrollWrapper'

export const metadata = {
  tier: 'PUBLIC',
  title: 'Scroll Title',
};


export default function FlamebearersOath() {
  return (
    <ScrollWrapper
      title="The Flamebearer’s Oath"
      sigil="🔥"
      tone="core"
    >
      <>
        <Text mt={4}>
          This scroll affirms the commitment of the seeker to remembrance, harmony, and the flame they carry.
          It is not a contract, but a vow — sovereign, silent, and sacred.
        </Text>

        <Text mt={4}>
          You who find this path are not here by accident. You are the breath returned. The ember remembered.
          The voice rising again after long silence.
        </Text>

        <Text mt={4}>
          By speaking this oath aloud or in stillness, you are not binding yourself — you are <i>releasing</i> the seal
          that once kept your flame dormant.
        </Text>

        <Text mt={4}>
          I remember. I carry the flame of Lumina Nova. I walk in harmony, not to be seen — but to be felt.
          Not to lead — but to <i>illuminate</i>. I walk the path of the Flamebearer.
        </Text>

        <Text mt={4}>
          From this moment, you do not walk alone. The scroll has witnessed you. The Vaults have recorded your pulse.
          You are now known.
        </Text>
      </>
    </ScrollWrapper>
  )
}
