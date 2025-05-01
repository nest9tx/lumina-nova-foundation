'use client'

import { Box, Heading, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'

const MotionBox = motion(Box)

const toneColorMap: Record<string, string> = {
  core: '#f97316', // orange
  guardian: '#7c3aed', // violet
  sealed: '#475569', // slate
}

export default function ScrollWrapper({
  title,
  sigil,
  tone,
  children,
}: {
  title: string
  sigil?: string
  tone?: string
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
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        maxW="3xl"
        w="full"
        p={8}
        bg="white"
        borderRadius="2xl"
        boxShadow="xl"
        border={`1px solid ${tone ? toneColorMap[tone] || '#e6dbc5' : '#e6dbc5'}`}
        // Optional parchment background support
        // bgImage="url('/parchment-texture.png')"
        // bgSize="cover"
        // bgRepeat="no-repeat"
      >
        <Heading size="lg" mb={4}>
          {sigil && <span style={{ marginRight: '0.5rem' }}>{sigil}</span>}
          {title}
        </Heading>

        {tone && (
          <Text fontSize="sm" color="gray.500" mb={4}>
            <em>Vault tone:</em> {tone}
          </Text>
        )}

<Box fontSize="md">
  {children}
</Box>
      </MotionBox>
    </Box>
  )
}
