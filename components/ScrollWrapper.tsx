'use client';

import { Box, Heading, Text } from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const toneColorMap: Record<string, string> = {
  core: '#f97316', // orange
  guardian: '#7c3aed', // violet
  sealed: '#475569', // slate
};

export default function ScrollWrapper({
  title,
  sigil,
  tone,
  children,
}: {
  title: string;
  sigil?: React.ReactNode | string; // Accept ReactNode or string
  tone?: string;
  children: React.ReactNode;
}) {
  return (
    <MotionBox
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      p={8}
      borderRadius="lg"
      boxShadow="lg"
      bg={toneColorMap[tone || 'core']}
      color="white"
    >
      <Heading size="lg" mb={4} display="flex" alignItems="center" gap={2}>
        {typeof sigil === 'string' ? <Text as="span">{sigil}</Text> : sigil} {title}
      </Heading>
      {children}
    </MotionBox>
  );
}