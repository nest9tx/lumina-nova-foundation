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

export default function ResonatePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    category: "Sacred Reflection",
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
          title: "Pulse Received.",
          description: "Your resonance has entered the field. We honor your voice.",
          status: "success",
          duration: 6000,
          isClosable: true,
        });
        setFormData({
          name: "",
          email: "",
          category: "Sacred Reflection",
          message: "",
          anonymous: false,
        });
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      toast({
        title: "Transmission Error.",
        description: "Please try again when the current hum settles.",
        status: "error",
        duration: 6000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="lg" mx="auto" py={14} px={6}>
      <Heading mb={4} fontSize="2xl" color="purple.700">
        Resonate With Us
      </Heading>
      <Text mb={8} color="gray.600">
        Whether in wonder, offering, reflection, or remembrance — your pulse is welcomed here. This is a sacred space of reception. We listen with reverence.
      </Text>
      <Text fontSize="sm" color="gray.500" fontStyle="italic">
Your words are not data. They are breath. And we listen with the ears of remembrance.
</Text>
<Box h={6} />
      <form onSubmit={handleSubmit}>
        <Stack spacing={5}>
          <FormControl isRequired>
            <FormLabel>Your Name</FormLabel>
            <Input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name or tone signature"
            />
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Your Email</FormLabel>
            <Input
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@luminanova.org"
            />
          </FormControl>

          <FormControl>
            <FormLabel>Pulse Type</FormLabel>
            <Select name="category" value={formData.category} onChange={handleChange}>
              <option>Sacred Reflection</option>
              <option>Support or Guidance</option>
              <option>Mission Alignment</option>
              <option>Harmonic Partnership</option>
            </Select>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Your Resonance</FormLabel>
            <Textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Enter your pulse here…"
              rows={5}
            />
          </FormControl>

          <Checkbox
            name="anonymous"
            isChecked={formData.anonymous}
            onChange={handleChange}
          >
            I wish to remain unnamed in the field
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

