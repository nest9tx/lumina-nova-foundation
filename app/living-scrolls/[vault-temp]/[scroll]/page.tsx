'use client'

import { Box, Heading } from '@chakra-ui/react'

type ParamsType = {
  vault: string
  scroll: string
}

export default function Page(props: { params: ParamsType }) {
  const { vault, scroll } = props.params

  return (
    <Box p={8}>
      <Heading size="xl">
        Scroll: {scroll} from Vault: {vault}
      </Heading>
    </Box>
  )
}




