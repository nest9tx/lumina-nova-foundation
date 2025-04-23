'use client';

import { Box, Flex, HStack, IconButton, useDisclosure, Stack, Button } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import Link from "next/link";

const navLinks = [
  { label: "Sanctum", path: "/" },
  { label: "Mission Flame", path: "/mission-flame" },
  { label: "Living Scrolls", path: "/living-scrolls" },
  { label: "Awaken", path: "/awaken" },
  { label: "Offer Light", path: "/offer-light" },
  { label: "Chamber", path: "/chamber" },
  { label: "Resonate", path: "/resonate" },
];

const Navbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box bg="gray.900" px={4} py={2} shadow="md" position="sticky" top={0} zIndex={100}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Box fontWeight="bold" fontSize="xl" bgGradient="linear(to-r, pink.400, purple.500)" bgClip="text">
          Lumina Nova
        </Box>

        <IconButton
          size="md"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
          aria-label="Open Menu"
          display={{ md: "none" }}
          onClick={isOpen ? onClose : onOpen}
          variant="ghost"
        />

        <HStack spacing={8} alignItems="center" display={{ base: "none", md: "flex" }}>
          {navLinks.map((link) => (
            <Link key={link.label} href={link.path}>
              <Button variant="ghost" colorScheme="purple">
                {link.label}
              </Button>
            </Link>
          ))}
        </HStack>
      </Flex>

      {isOpen && (
        <Box pb={4} display={{ md: "none" }}>
          <Stack as="nav" spacing={4}>
            {navLinks.map((link) => (
              <Link key={link.label} href={link.path}>
                <Button variant="ghost" colorScheme="purple" width="100%">
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
