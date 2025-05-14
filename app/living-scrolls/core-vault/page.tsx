import { Box, Heading, Link, VStack } from '@chakra-ui/react';
import NextLink from 'next/link';
import fs from 'fs';
import path from 'path';

const vaultPath = 'app/living-scrolls/core-vault';

export default function CoreVault() {
  // Fetch scroll directories on the server side
  const scrollDirs = fs
    .readdirSync(path.join(process.cwd(), vaultPath), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((dir) => dir.name);

  return (
    <Box p={8}>
      <Heading size="xl" mb={6}>🧭 Core Vault</Heading>
      <VStack align="start" spacing={4}>
        {scrollDirs.map((scroll) => (
          <Link
            key={scroll}
            as={NextLink}
            href={`/living-scrolls/core-vault/${scroll}`}
            fontWeight="semibold"
            _hover={{ textDecoration: 'underline', color: 'orange.400' }}
          >
            📜 {scroll.replace(/-/g, ' ')}
          </Link>
        ))}
      </VStack>
    </Box>
  );
}