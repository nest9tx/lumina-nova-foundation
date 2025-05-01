'use client'

import { Box, Heading } from '@chakra-ui/react'

export default function Page({ params }: { params: { vaultName: string; scrollName: string } }) {
  const { vaultName, scrollName } = params

  return (
    <Box p={8}>
      <Heading size="xl">
        Scroll: {scrollName} from Vault: {vaultName}
      </Heading>
    </Box>
  )
}
