import { Box, Heading, Text, Button, VStack } from '@chakra-ui/react'
import Link from 'next/link'

type Props = {
  params: {
    vault: string
    scroll: string
  }
}

export async function generateMetadata({ params }: Props) {
  return {
    title: `${params.scroll.replace(/-/g, ' ')} | ${params.vault.replace(/-/g, ' ')}`,
  }
}

// ✅ This correct typing solves Vercel’s “Promise” confusion
export default function Page({ params }: Props) {
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


