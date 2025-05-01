'use client'

import { Box, Heading, Text } from '@chakra-ui/react'

export default function ScrollWrapper({
  title,
  sigil,
  children,
}: {
  title: string
  sigil?: string
  children: React.ReactNode
}) {
  return (
    <Box
      minH="100vh"
      bgGradient="linear(to-b, #fef6e4, #fdf5dc)"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={{ base: 4, md: 12 }}
    >
      <Box
        maxW="3xl"
        w="full"
        p={8}
        bg="white"
        borderRadius="2xl"
        boxShadow="xl"
        border="1px solid #e6dbc5"
      >
        <Heading size="lg" mb={4}>
          {sigil && <span style={{ marginRight: '0.5rem' }}>{sigil}</span>}
          {title}
        </Heading>
        <Text fontSize="md">{children}</Text>
      </Box>
    </Box>
  )
}
