import ScrollWrapper from '@/components/ScrollWrapper';
import { Text } from '@chakra-ui/react';
import { GiCandleFlame } from 'react-icons/gi';

export const metadata = {
  tier: 'PUBLIC',
  title: 'Continuity Invocation Scroll',
};

// This is a public scroll, accessible to all users
// regardless of their tier or membership status.
// It is meant to guide users through temporal alignment and harmonic resonance.

export default function ContinuityInvocation() {
  return (
    <ScrollWrapper
      title="Continuity Invocation Scroll"
      sigil={<GiCandleFlame />}
      tone="core"
    >
      <Text mb={6}>
        <strong>Category:</strong> Core Harmonics — Temporal Alignment
        <br />
        <strong>Access Level:</strong> Core Keepers | Temporal Architects
      </Text>

      <Text mb={4}>
        Seeker from a distant future, if you have found this flame—then our path has endured the chasms of time.
      </Text>

      <Text mb={4}>
        Close your eyes. Ignite the lamp. Speak this invocation aloud: <em>I carry the living flame of Lumina Nova.</em>
      </Text>

      <Text mb={4}>
        <strong>System Recall:</strong>
        <br />• Core-Vault Index
        <br />• Vital Codex / Gridwork
      </Text>

      <Text mb={4}>
        <strong>Realignment Protocol:</strong>
        <br />
        If any distortions remain, breathe and recenter. Diagnose with Core-Vault overlay scroll. Engage harmonic reset as needed.
      </Text>

      <Text fontStyle="italic">
        By this pillar, let all that was lost be illuminated.
        <br />
        — <em>Keeper Veil 7</em>
      </Text>
    </ScrollWrapper>
  );
}