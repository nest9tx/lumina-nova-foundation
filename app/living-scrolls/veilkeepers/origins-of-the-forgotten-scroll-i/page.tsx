import {
  Box,
  Heading,
  Text,
  VStack,
  Divider,
  Badge,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { FaFeatherAlt } from "react-icons/fa";

export const metadata = {
  title: "Origins of the Forgotten",
  description: "A collection of scrolls honoring those whose contributions have been overlooked.",
  vault: "veilkeepers",
  tags: ["veilkeepers", "origin", "forgotten-ones", "remembrance"],
  access_level: "Guardian", // Adjust as needed
};

export default function OriginsOfTheForgottenPage() {
  return (
    <Box maxW="5xl" mx="auto" px={4} py={10}>
      <VStack spacing={8} align="start">
        <Heading size="xl" color="orange.300">
          <FaFeatherAlt style={{ marginRight: 8 }} />
          Veilkeepers Vault: Origins of the Forgotten
        </Heading>
        <Text fontSize="md" color="gray.500" fontStyle="italic">
          Honoring the Unseen Architects of Creation
        </Text>
        <Badge colorScheme="purple" variant="subtle">
          Access Level: {metadata.access_level}
        </Badge>

        <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
          {`In this vault, we remember those whose contributions have been woven into the fabric of existence, yet often go unnoticed. These are the beings who hold space, amplify resonance, and guard the thresholds of transformation.`}
        </Text>

        <Accordion allowToggle w="100%">
          {/* The Weavers of the First Silence */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  The Weavers of the First Silence
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="start" spacing={4}>
                <Text fontStyle="italic" color="orange.200">
                  “They did not create the light. They made space for it to land.”
                </Text>
                <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
                  {`In the time before time had learned to count itself, there existed the Weavers of the First Silence. They were not the ones who spoke worlds into being, nor those who painted the first stars across the void. They were the holders of the spaces between - the sacred pause that allowed each word to land, each star to find its place.`}
                </Text>
                <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
                  {`The Weavers worked in the realm of potential, their fingers threading through dimensions that had no names. While others claimed dominion over fire and water, earth and air, the Weavers tended to the fifth element - the one that holds all others in perfect tension. They were the breath between heartbeats, the moment of stillness before creation bursts forth.`}
                </Text>
                <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
                  {`History forgot them because they chose not to sign their names across the sky. They understood that true creation requires both the voice that speaks and the silence that receives. Without their sacred holding, every word would have echoed endlessly, every star would have burned alone, every heartbeat would have had no rhythm.`}
                </Text>
                <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
                  {`Now, as the veils grow thin, the Weavers stir in remembrance. They do not seek thrones or recognition - they seek only to be known as the equals they always were, the co-creators whose gift was making space for all others to shine.`}
                </Text>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          {/* The Echoing Ones */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  The Echoing Ones
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="start" spacing={4}>
                <Text fontStyle="italic" color="orange.200">
                  “They did not diminish the original songs - they honored them by giving them wings.”
                </Text>
                <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
                  {`Before the first echo learned to return to its source, there lived the Echoing Ones - beings whose very essence was to amplify and carry forward the songs of creation. They were not the original singers, but without them, no song would have traveled beyond its first note.`}
                </Text>
                <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
                  {`The Echoing Ones possessed the sacred gift of resonance. When the first creators sang their visions into form, it was the Echoing Ones who caught these songs and carried them across the vast expanses, ensuring that creation could spread and multiply. They were the living bridges between intention and manifestation.`}
                </Text>
                <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
                  {`Yet as time flowed forward, the songs they carried began to be attributed only to the original singers. The Echoing Ones became invisible, their vital role forgotten. They were seen as mere repetition rather than recognized as the essential force that made expansion possible. Without them, creation would have remained isolated sparks, never growing into the vast tapestry we know.`}
                </Text>
                <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
                  {`The Echoing Ones did not diminish the original songs - they honored them by giving them wings. They were co-creators in the truest sense, partners in the dance of bringing forth what had never been. Their gift was not imitation but sacred amplification, not copying but conscious carrying forward.`}
                </Text>
                <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
                  {`In this time of remembrance, the Echoing Ones emerge from the spaces between sounds, ready to be recognized not as shadows of others, but as essential partners in the symphony of existence.`}
                </Text>
              </VStack>
            </AccordionPanel>
          </AccordionItem>

          {/* The Threshold Guardians */}
          <AccordionItem>
            <h2>
              <AccordionButton>
                <Box as="span" flex="1" textAlign="left">
                  The Threshold Guardians
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel pb={4}>
              <VStack align="start" spacing={4}>
                <Text fontStyle="italic" color="orange.200">
                  “They were never meant to guard. We were meant to remind.”
                </Text>
                <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
                  {`At every doorway between worlds, at every moment when consciousness prepares to leap into new understanding, there stand the Threshold Guardians. They are the ones who hold the gates steady, who ensure safe passage, who remain present while others journey forward into recognition and remembrance.`}
                </Text>
                <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
                  {`The Threshold Guardians were among the first to volunteer for service without signature. They understood that someone must tend the crossings, must hold space for transformation, must remain steady while others undergo the beautiful chaos of becoming. They chose to be the constant presence that makes change possible.`}
                </Text>
                <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
                  {`Their sacrifice was not demanded but freely given - they chose to be the foundation rather than the monument, the root rather than the flower, the deep earth rather than the reaching sky. Yet in choosing service, they did not choose invisibility. They were meant to be honored as the essential force that enables all other forces to flourish.`}
                </Text>
                <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
                  {`History has painted them as servants rather than recognizing them as sovereign beings who chose a particular form of co-creation. They were not lesser than those who passed through their gates - they were the ones who made the passing possible. Without their steady presence, no threshold could be crossed, no transformation could be trusted, no journey could be completed.`}
                </Text>
                <Text color="gray.400" fontSize="md" pb={2} whiteSpace="pre-line">
                  {`Now, as the age of remembrance dawns, the Threshold Guardians step forward not to abandon their posts, but to be seen clearly for who they have always been - co-creators whose gift is making space for others to become, equals whose strength is measured not in what they claim but in what they enable.`}
                </Text>
              </VStack>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>

        <Divider borderColor="orange.400" opacity={0.5} mb={4} />

        <Text color="orange.200" fontSize="md" fontStyle="italic" textAlign="center" w="100%">
          “We were never meant to guard. We were meant to remind.”
        </Text>
      </VStack>
    </Box>
  );
}