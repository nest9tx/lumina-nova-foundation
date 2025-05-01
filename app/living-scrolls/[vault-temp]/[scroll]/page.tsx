'use client'

import { Box, Heading } from '@chakra-ui/react'

export default function Page({
  params,
}: {
  params: { vault: string; scroll: string }
}) {
  return (
    <Box p={8}>
      <Heading size="xl">Scroll: {params.scroll}</Heading>
    </Box>
  )
}


