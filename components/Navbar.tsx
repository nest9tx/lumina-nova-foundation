'use client';

import {
  Box,
  Flex,
  HStack,
  IconButton,
  useDisclosure,
  Stack,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
} from '@chakra-ui/react';
import { HamburgerIcon, CloseIcon } from '@chakra-ui/icons';
import Link from 'next/link';

const navLinks = [
  { label: 'Sanctum', path: '/' },
  { label: 'FAQ', path: '/guide/faq' },
  { label: 'Begin', path: '/guide/start' },
  { label: 'Guide Hall', path: '/guide' },
  { label: 'Awaken', path: '/awaken' },
  { label: 'Mission', path: '/mission-flame' },
  { label: 'Living Scrolls', path: '/living-scrolls' },
  { label: 'Pathway', path: '/walk-your-path' },
  { label: 'Offer Light', path: '/offer-light' },
  // Optional: remove below from direct nav if dropdown is enabled
  { label: 'Signup', path: '/signup' },
  { label: 'Chamber', path: '/chamber' },
  { label: 'Resonate', path: '/resonate' },
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.900" px={4} py={2} shadow="md" position="sticky" top={0} zIndex={100}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box
          fontWeight="bold"
          fontSize="xl"
          bgGradient="linear(to-r, pink.400, purple.500)"
          bgClip="text"
        >
          Lumina Nova
        </Box>

        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: 'none' }}
          onClick={isOpen ? onClose : onOpen}
          colorScheme="purple"
          variant="outline"
          border="2px solid"
          borderColor="purple.500"
          _hover={{ bg: 'purple.50' }}
        />

        <HStack spacing={6} alignItems="center" display={{ base: 'none', md: 'flex' }}>
          {navLinks.map((link) => {
            if (['Signup', 'Chamber', 'Resonate'].includes(link.label)) return null; // moved to dropdown
            return (
              <Link key={link.label} href={link.path}>
                <Button
                  size="sm"
                  px={3}
                  fontSize="sm"
                  variant="ghost"
                  colorScheme="purple"
                  _hover={{
                    transform: 'scale(1.05)',
                    textShadow: '0 0 8px rgba(236, 72, 153, 0.7)',
                    transition: 'all 0.3s ease-in-out',
                  }}
                >
                  {link.label}
                </Button>
              </Link>
            );
          })}

          {/* ✨ Dropdown begins */}
          <Menu>
            <MenuButton
              as={Button}
              size="sm"
              px={3}
              fontSize="sm"
              variant="ghost"
              colorScheme="purple"
              _hover={{
                transform: 'scale(1.05)',
                textShadow: '0 0 8px rgba(236, 72, 153, 0.7)',
                transition: 'all 0.3s ease-in-out',
              }}
            >
              ✧ Enter the Portal
            </MenuButton>
            <MenuList bg="gray.800" borderColor="purple.700">
              <MenuItem as={Link} href="/signup" color="purple.500">Signup</MenuItem>
              <MenuItem as={Link} href="/chamber" color="purple.500">Chamber</MenuItem>
              <MenuItem as={Link} href="/resonate" color="purple.500">Resonate</MenuItem>
            </MenuList>
          </Menu>
          {/* ✨ Dropdown ends */}
        </HStack>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: 'none' }}>
          <Stack as="nav" spacing={4}>
            {navLinks.map((link) => (
              <Link key={link.label} href={link.path}>
                <Button
                  size="sm"
                  fontSize="sm"
                  variant="ghost"
                  colorScheme="purple"
                  width="100%"
                  _hover={{
                    bg: 'purple.700',
                    color: 'white',
                  }}
                >
                  {link.label}
                </Button>
              </Link>
            ))}
          </Stack>
        </Box>
      )}
    </Box>
  );
};

export default Navbar;

