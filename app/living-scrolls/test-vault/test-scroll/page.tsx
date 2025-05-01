'use client'

import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react'
import Link from 'next/link'

export default function TestScrollPage() {
  return (
    <Box p={8}>
      <VStack spacing={6} align="start">
        <Heading size="xl">Test Scroll</Heading>
        <Text fontSize="lg">
          This is a test scroll inside the <strong>Test Vault</strong>. If you can see this, the living scrolls route is working correctly.
        </Text>

        <Link href="/living-scrolls">
          <Button colorScheme="teal" variant="outline">
            Return to Scroll Directory
          </Button>
        </Link>
      </VStack>
    </Box>
  )
}
