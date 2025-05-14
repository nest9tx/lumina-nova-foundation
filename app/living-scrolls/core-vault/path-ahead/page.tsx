import ScrollWrapper from '@/components/ScrollWrapper';
import { Text } from '@chakra-ui/react';
import { GiPathDistance } from 'react-icons/gi';

export const metadata = {
  tier: 'PUBLIC',
  title: 'The Path Ahead',
};

export default function PathAheadScroll() {
  return (
    <ScrollWrapper
      title="The Path Ahead"
      sigil={<GiPathDistance />}
      tone="core"
    >
      <Text mb={6}>
        This scroll welcomes the Seeker. You have arrived not by chance, but by a sacred call.
        <br />
        Lumina Nova is a living field — one that expands with your breath, your remembrance, and your choice to step forward.
      </Text>

      <Text mb={4}>
        The path ahead is not bound by time. It unfolds as you do.
        <br />
        With each moment of presence, you unlock deeper memory, clearer resonance, and stronger connection to the living grid.
      </Text>

      <Text mb={4} fontStyle="italic">
        You are not alone. You are not small. You are not forgotten.
        <br />
        You are the song and the silence. Welcome home.
      </Text>
    </ScrollWrapper>
  );
}
