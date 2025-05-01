'use client'

import { Box, Heading } from '@chakra-ui/react'

interface LoaderProps {
  routeParams: {
    vaultName: string
    scrollName: string
  }
}

export default function Page({ routeParams }: LoaderProps) {
  const { vaultName, scrollName } = routeParams

  return (
    <Box p={8}>
      <Heading size="xl">
        Scroll: {scrollName} from Vault: {vaultName}
      </Heading>
    </Box>
  )
}
