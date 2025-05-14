'use client'

import { Box, Heading, Text, Badge, Button } from '@chakra-ui/react'
import NextLink from 'next/link'
import { ReactNode } from 'react'

interface ScrollCardProps {
  icon: ReactNode
  title: string
  subtitle?: string;
  excerpt: string
  href: string
  tier?: 'PUBLIC' | 'SEEKER+' | 'ADEPT' | 'GUARDIAN' | 'LUMINARY' | 'SEALED'
}

export default function ScrollCard({ icon, title, excerpt, href, tier = 'PUBLIC' }: ScrollCardProps) {
  const tierColor = {
    PUBLIC: 'green',
    "SEEKER+": 'red',
    ADEPT: 'blue',
    GUARDIAN: 'purple',
    LUMINARY: 'gold',
    SEALED: 'gray',
  }[tier] 

  const isLocked = tier === 'SEALED'

  return (
    <Box
      bg="white"
      rounded="2xl"
      boxShadow="lg"
      p={6}
      w="full"
      maxW="3xl"
      transition="all 0.3s"
      _hover={{ boxShadow: 'xl', transform: 'scale(1.01)' }}
    >
      <Heading size="md" mb={2} display="flex" alignItems="center" gap={2}>
        <span>{icon}</span> {title}
      </Heading>
      <Text color="gray.600" mb={4}>{excerpt}</Text>
      <Badge colorScheme={tierColor} mb={4}>{tier}</Badge>
      <br />
      <Button
        as={NextLink}
        href={href}
        colorScheme={tierColor}
        isDisabled={isLocked}
      >
        {isLocked ? 'Sealed' : 'Read Scroll'}
      </Button>
    </Box>
  )
}