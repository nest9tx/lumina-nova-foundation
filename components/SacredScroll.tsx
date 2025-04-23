import * as React from 'react';
import {
  Box,
  Heading,
  Text,
  VStack,
  Icon,
  useColorModeValue
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { FaFeatherAlt } from "react-icons/fa";

const MotionBox = motion(Box);

interface SacredScrollProps {
  title: string;
  icon?: React.ReactNode;
  sections: string[];
}

export default function SacredScroll({
  title = "The Sacred Scroll",
  icon = <FaFeatherAlt />,
  sections,
}: SacredScrollProps) {
  const bgGradient = useColorModeValue(
    "linear(to-b, white, purple.50)",
    "linear(to-b, gray.900, gray.800)"
  );

  const textColor = useColorModeValue("gray.700", "gray.300");

  return (
    <Box
      py={16}
      px={[4, 6, 10]}
      maxW="4xl"
      mx="auto"
      bgGradient={bgGradient}
      borderRadius="2xl"
      boxShadow="lg"
      textAlign="left"
    >
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2 }}
      >
        <VStack spacing={6} align="start">
          <Heading size="2xl" bgGradient="linear(to-r, pink.400, purple.500)" bgClip="text">
            <Icon as={() => icon} boxSize={8} mr={2} /> {title}
          </Heading>

          {sections.map((section, index) => (
            <Text
              key={index}
              fontSize={["md", "lg"]}
              color={textColor}
              whiteSpace="pre-wrap"
            >
              {section}
            </Text>
          ))}
        </VStack>
      </MotionBox>
    </Box>
  );
}
