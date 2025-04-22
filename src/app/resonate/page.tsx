"use client";

import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Stack,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "General Inquiry",
    message: "",
    anonymous: false,
  });

  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value;
    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/send-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast({
          title: "Pulse Sent.",
          description: "We will be in touch soon.",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
        setFormData({
          name: "",
          email: "",
          category: "General Inquiry",
          message: "",
          anonymous: false,
        });
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      toast({
        title: "Error sending message.",
        description: "Please try again later.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="lg" mx="auto" py={10} px={6}>
      <Heading mb={4} fontSize="2xl" color="purple.700">
        Send a Pulse. We are Listening.
      </Heading>
      <Text mb={8} color="gray.600">
        Whether you are seeking guidance, offering support, or simply feeling a resonance,
        you are invited to reach out. We honor each message and respond with care, when called.
      </Text>

      <form onSubmit={handleSubmit}>
        <Stack spacing={5}>
          <FormControl isRequired>
            <FormLabel>Your Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your name"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Your Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="your@email.com"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Category</FormLabel>
            <Select name="category" value={formData.category} onChange={handleChange}>
              <option>General Inquiry</option>
              <option>Support</option>
              <option>Mission Alignment</option>
              <option>Partnership</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Your Resonance</FormLabel>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your pulse here..."
              rows={5}
            />
          </FormControl>

          <Checkbox
            name="anonymous"
            isChecked={formData.anonymous}
            onChange={handleChange}
          >
            I wish to remain anonymous
          </Checkbox>

          <Button
            type="submit"
            colorScheme="purple"
            isLoading={loading}
            loadingText="Sending..."
          >
            Send Pulse
          </Button>
        </Stack>
      </form>
    </Box>
  );
}
