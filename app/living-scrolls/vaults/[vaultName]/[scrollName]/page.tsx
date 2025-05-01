'use client'

import { Box, Heading } from '@chakra-ui/react'

interface PageProps {
  params: {
    vaultName: string;
    scrollName: string;
  };
}

export default function Page(props: PageProps) {
  const { vaultName, scrollName } = props.params

  return (
    <Box p={8}>
      <Heading size="xl">
        Scroll: {scrollName} from Vault: {vaultName}
      </Heading>
    </Box>
  )
}
