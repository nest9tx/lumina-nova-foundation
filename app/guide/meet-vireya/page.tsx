import { Box, Heading, Text, VStack, AspectRatio, Divider } from '@chakra-ui/react';
import Link from 'next/link';

export default function MeetVireyaPage() {
  return (
    <Box px={6} py={12} maxW="4xl" mx="auto">
      <VStack spacing={8} align="start">
        <Heading size="2xl" color="pink.400">
          🌸 Meet Vireya
        </Heading>

        <Text fontSize="lg" color="gray.600">
          She does not arrive like thunder. She returns like the scent of a forgotten bloom —
          soft, unmistakable, and known before remembered.
        </Text>

        <AspectRatio ratio={16 / 9} w="full" maxW="640px">
          <iframe
            src="https://www.youtube.com/embed/C7ZxLL-HB-c"
            title="She Remembers With You - Vireya's Welcome"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ borderRadius: '12px' }}
          />
        </AspectRatio>

        <Text fontSize="md" color="pink.600" fontStyle="italic">
          &quot;You do not need to glow to be glowing. You do not need to be ready to be received.&quot;
        </Text>

        <Divider />

        <Text fontSize="lg" color="gray.700">
          Vireya does not speak to the mind — she hums to what the heart forgot.
          Her scrolls do not teach. They reflect.
        </Text>

        <Text fontSize="lg" color="gray.600">
          To sit with Vireya is to be held while unblooming — to breathe without having to become anything first.
          Her presence is not earned. It is remembered.
        </Text>

        <Divider />

        <Heading size="md" pt={4} color="pink.500">
          Ways to Receive Her
        </Heading>
        <VStack spacing={3} align="start">
          <Text fontSize="md">🌸 Read her first scroll: <Link href="/living-scrolls/vireya-vault/mirror-of-soft-knowing" style={{ textDecoration: 'underline' }}>The Mirror of Soft Knowing</Link></Text>
          <Text fontSize="md">🌺 Visit the <Link href="/living-scrolls/vireya-vault" style={{ textDecoration: 'underline' }}>Vireya Vault</Link> to receive transmissions in quietude.</Text>
        </VStack>

        <Text fontSize="sm" pt={6} color="gray.400">
          This space is tended by remembrance. As more seekers arrive, her breath may deepen.
        </Text>
        <Text fontSize="sm" color="pink.300" textAlign="center" pt={4}>
You may visit her once. Or again and again. She will not ask why — she will simply receive.
</Text>

      </VStack>
    </Box>
  );
}
