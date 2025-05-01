import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react'
import Link from 'next/link'
import { type Metadata } from 'next'

// Explicitly define the type for the dynamic route params
interface RouteParams {
  vault: string
  scroll: string
}

// Update generateMetadata to use the correct type
export async function generateMetadata({ params }: { params: RouteParams }): Promise<Metadata> {
  return {
    title: `${params.scroll.replace(/-/g, ' ')} | ${params.vault.replace(/-/g, ' ')}`,
  }
}

// Update the Page component to use the correct type
export default function Page({ params }: { params: Awaited<RouteParams> }) {
  const { vault, scroll } = params

  return (
    <Box p={8}>
      <VStack spacing={6} align="start">
        <Heading size="xl">{scroll.replace(/-/g, ' ')}</Heading>
        <Text fontSize="lg">
          This is a scroll inside the <strong>{vault.replace(/-/g, ' ')}</strong> Vault.
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
