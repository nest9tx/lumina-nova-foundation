'use client'

import { Box, Heading } from '@chakra-ui/react'

type RouteParams = {
  params: {
    vaultName: string
    scrollName: string
  }
}

export default function Page({ params }: RouteParams) {
  const { vaultName, scrollName } = params

  return (
    <Box p={8}>
      <Heading size="xl">
        Scroll: {scrollName} from Vault: {vaultName}
      </Heading>
    </Box>
  )
}

