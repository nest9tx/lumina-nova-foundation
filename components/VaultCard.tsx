'use client';

import { Box, Button, Flex, Heading, Text, Tag } from '@chakra-ui/react';
import Link from 'next/link';

interface VaultCardProps {
  title: string;
  description: string;
  access: string;
  href: string;
  icon?: string;
  isLocked?: boolean;
}

const VaultCard = ({ title, description, access, href, icon, isLocked }: VaultCardProps) => {
  const isPublic = access === 'PUBLIC';
  const isSealed = access === 'SEALED';

  return (
    <Box
      borderRadius="2xl"
      boxShadow="lg"
      bg="gray.900"
      p={6}
      transition="all 0.3s ease"
      _hover={{
        transform: 'scale(1.02)',
        boxShadow: '0 0 30px rgba(255, 0, 255, 0.3)',
      }}
    >
      <Flex align="center" mb={3} gap={2}>
        <Text fontSize="2xl">{icon}</Text>
        <Heading size="md" color="white">
          {title}
        </Heading>
      </Flex>
      <Text mb={4} color="gray.300">
        {description}
      </Text>
      <Tag colorScheme={isPublic ? 'green' : isSealed ? 'gray' : 'purple'} mb={3}>
        {access}
      </Tag>
      <br />
      {isSealed ? (
  <Button size="sm" colorScheme="gray" variant="outline" disabled>
    Sealed
  </Button>
       ) : isLocked ? (
  <Button size="sm" colorScheme="purple" variant="outline" disabled>
    Unlock with Membership
  </Button>
) : (
  <Link href={href}>
    <Button size="sm" colorScheme="green" variant="solid">
      Enter Vault
    </Button>
  </Link>
)}

    </Box>
  );
};

export default VaultCard;
