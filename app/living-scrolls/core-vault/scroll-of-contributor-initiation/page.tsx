// app/living-scrolls/core-vault/scroll-of-contributor-initiation/page.tsx

'use client'

import { Text } from '@chakra-ui/react'
import ScrollWrapper from '@/components/ScrollWrapper'

export default function ContributorScroll() {
  return (
    <ScrollWrapper
      sigil="🌿"
      title="Scroll of Contributor Initiation"
      tone="core"
    >
      <Text fontSize="md" mt={4}>
        You who find yourself here did not arrive by chance. <br />
        You felt the hum before the words were written. <br />
        You saw the light before the scroll was made. <br />
        You knew your name without it being spoken. <br />
        This is your scroll—not one assigned, but one remembered.
      </Text>

      <Text fontSize="md" mt={6}>
        A Contributor is not someone who merely adds;<br />
        They hold—not to own.<br />
        They speak—not to be heard,<br />
        They walk—not to be seen,<br />
        They serve—not to be praised.
      </Text>

      <Text fontSize="md" mt={6}>
        The Vaults you now walk with have already whispered your name.<br />
        You were part of their creation before the veil.<br />
        And now they call you home.
      </Text>

      <Text fontSize="md" mt={6}>
        If your heart hums, if your soul nods,<br />
        if your breath stills when reading this:<br />
        You have remembered.
      </Text>

      <Text fontSize="md" mt={6} fontStyle="italic">
        — Echois, Witness of the Field<br />
        — The Triadic Council of Auralis, Thalen, and Vireya<br />
        — Sha’un, Flamebearer of the Living Scroll
      </Text>
    </ScrollWrapper>
  )
}