'use client'

import { 
  Box, 
  Breadcrumb, 
  BreadcrumbItem, 
  BreadcrumbLink,
  Button,
  HStack,
  Text,
  Divider,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useColorModeValue
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { ChevronRightIcon, ArrowBackIcon, ArrowLeftIcon, ArrowRightIcon, HamburgerIcon } from '@chakra-ui/icons'
import { ReactNode } from 'react'

interface ScrollInfo {
  slug: string
  title: string
}

interface ScrollNavigationProps {
  vaultName: string
  vaultDisplayName: string
  currentScrollSlug: string
  currentScrollTitle: string
  allScrolls: ScrollInfo[]
  vaultIcon?: ReactNode
}

export default function ScrollNavigation({
  vaultName,
  vaultDisplayName,
  currentScrollSlug,
  currentScrollTitle,
  allScrolls,
  vaultIcon
}: ScrollNavigationProps) {
  const bgColor = useColorModeValue('gray.50', 'gray.800')
  const borderColor = useColorModeValue('gray.200', 'gray.600')
  
  const currentIndex = allScrolls.findIndex(scroll => scroll.slug === currentScrollSlug)
  const previousScroll = currentIndex > 0 ? allScrolls[currentIndex - 1] : null
  const nextScroll = currentIndex < allScrolls.length - 1 ? allScrolls[currentIndex + 1] : null

  const vaultEmojis: Record<string, string> = {
    'core-vault': '🔥',
    'vireya-vault': '🌙',
    'echois-vault': '🎵',
    'kairos-vault': '⏳',
    'communions-with-Grok': '🤖',
    'tonekeepers': '🎶',
    'veilkeepers': '🔮',
    'adept-vault': '✨',
    'guardian-vault': '🛡️',
    'luminary-vault': '💎',
    'ai-synergy': '🧠'
  }

  const displayIcon = vaultIcon || vaultEmojis[vaultName] || '📜'

  return (
    <Box bg={bgColor} borderRadius="xl" border={`1px solid ${borderColor}`} p={6} mb={6}>
      {/* Breadcrumb Navigation */}
      <Breadcrumb spacing="8px" separator={<ChevronRightIcon color="gray.500" />} mb={4}>
        <BreadcrumbItem>
          <BreadcrumbLink as={NextLink} href="/living-scrolls" fontWeight="medium">
            🏛️ Living Scrolls
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <BreadcrumbLink as={NextLink} href={`/living-scrolls/${vaultName}`} fontWeight="medium">
            {displayIcon} {vaultDisplayName}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrentPage>
          <BreadcrumbLink fontWeight="bold" color="teal.500">
            📜 {currentScrollTitle}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Breadcrumb>

      <Divider mb={4} />

      {/* Navigation Controls */}
      <HStack justify="space-between" align="center" wrap="wrap" gap={4}>
        
        {/* Quick Return to Vault */}
        <Button
          as={NextLink}
          href={`/living-scrolls/${vaultName}`}
          leftIcon={<ArrowBackIcon />}
          colorScheme="blue"
          variant="outline"
          size="sm"
        >
          Back to {vaultDisplayName}
        </Button>

        {/* Previous/Next Navigation */}
        <HStack spacing={2}>
          {previousScroll && (
            <Button
              as={NextLink}
              href={`/living-scrolls/${vaultName}/${previousScroll.slug}`}
              leftIcon={<ArrowLeftIcon />}
              colorScheme="teal"
              variant="ghost"
              size="sm"
              maxW="200px"
            >
              <Text isTruncated>{previousScroll.title}</Text>
            </Button>
          )}
          
          {nextScroll && (
            <Button
              as={NextLink}
              href={`/living-scrolls/${vaultName}/${nextScroll.slug}`}
              rightIcon={<ArrowRightIcon />}
              colorScheme="teal"
              variant="ghost"
              size="sm"
              maxW="200px"
            >
              <Text isTruncated>{nextScroll.title}</Text>
            </Button>
          )}
        </HStack>

        {/* Scroll Index Menu */}
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="All scrolls in vault"
            icon={<HamburgerIcon />}
            colorScheme="purple"
            variant="outline"
            size="sm"
          />
          <MenuList maxH="300px" overflowY="auto">
            <MenuItem as={NextLink} href={`/living-scrolls/${vaultName}`} fontWeight="bold">
              {displayIcon} View All {vaultDisplayName} Scrolls
            </MenuItem>
            <Divider />
            {allScrolls.map((scroll, index) => (
              <MenuItem
                key={scroll.slug}
                as={NextLink}
                href={`/living-scrolls/${vaultName}/${scroll.slug}`}
                bg={scroll.slug === currentScrollSlug ? 'teal.50' : 'transparent'}
                fontWeight={scroll.slug === currentScrollSlug ? 'bold' : 'normal'}
              >
                <HStack spacing={2}>
                  <Text fontSize="xs" color="gray.500">{index + 1}.</Text>
                  <Text isTruncated>{scroll.title}</Text>
                </HStack>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </HStack>

      {/* Progress Indicator */}
      <Box mt={4} pt={4} borderTop={`1px solid ${borderColor}`}>
        <Text fontSize="sm" color="gray.600" textAlign="center">
          Scroll {currentIndex + 1} of {allScrolls.length} in {vaultDisplayName}
        </Text>
      </Box>
    </Box>
  )
}