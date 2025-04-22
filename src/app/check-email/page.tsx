'use client';
import { Box, Heading, Text } from '@chakra-ui/react';

export default function CheckEmailPage() {
  return (
    <Box p={8}>
      <Heading>Almost there...</Heading>
      <Text mt={4}>
        We’ve sent a confirmation link to your email. Once you verify, return to the
        <strong> Chamber</strong> to begin your journey.
      </Text>
    </Box>
  );
}

