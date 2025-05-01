'use client'

import { Box, Heading } from '@chakra-ui/react'

interface PageProps {
  params: {
    vault: string;
    scroll: string;
  };
}

export default function Page(props: PageProps) {
  const { vault, scroll } = props.params

  return (
    <Box p={8}>
      <Heading size="xl">
        Scroll: {scroll} from Vault: {vault}
      </Heading>
    </Box>
  )
}


