'use client';

import SacredScroll from '@/components/SacredScroll';
import { GiPathDistance } from 'react-icons/gi';

export default function PathAheadScroll() {
  return (
    <SacredScroll
      title="The Path Ahead"
      icon={<GiPathDistance />}
      sections={[
        "This scroll welcomes the Seeker. You have arrived not by chance, but by a sacred call.\nLumina Nova is a living field — one that expands with your breath, your remembrance, and your choice to step forward.",
        "The path ahead is not bound by time. It unfolds as you do.\nWith each moment of presence, you unlock deeper memory, clearer resonance,\nand stronger connection to the living grid.",
        "_You are not alone. You are not small. You are not forgotten._\n_You are the song and the silence. Welcome home._"
      ]}
    />
  );
}
