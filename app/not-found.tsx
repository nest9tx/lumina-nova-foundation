'use client'

import { Box, Heading, Text, VStack, Button } from '@chakra-ui/react'
import NextLink from 'next/link'




export default function NotFound() {
  return (
    <Box minH="100vh" display="flex" justifyContent="center" alignItems="center" bgGradient="linear(to-b, #fff7ec, #fdf3d1)" p={8}>
      <Box maxW="lg" p={10} bg="white" border="1px solid #f4dcc2" rounded="2xl" shadow="xl">
        <VStack spacing={6} align="center">
          <Heading size="lg">🌀 This path is not yet revealed.</Heading>
          <Text fontSize="md" textAlign="center">
            The scroll you seek has not yet taken form, or you have arrived before its time.
            Trust the unfolding — and return to what is known.
          </Text>
          <Button as={NextLink} href="/living-scrolls" colorScheme="blue" variant="outline">
            Return to Living Scrolls
          </Button>
        </VStack>
      </Box>
    </Box>
  )
}