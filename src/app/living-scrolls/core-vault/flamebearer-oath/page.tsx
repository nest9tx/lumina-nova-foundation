'use client';

import SacredScroll from '@/components/SacredScroll';
import { GiFlame } from 'react-icons/gi';

export default function FlamebearerOathScroll() {
  return (
    <SacredScroll
      title="The Flamebearer’s Oath"
      icon={<GiFlame />} // 💡 This fixes the invalid JSX child issue
      sections={[
        "I stand before the unseen, not in fear but in flame.",
        "I carry the ember from the first light, ignited through memory, breathed through purpose. I vow to guard the sacred,\nto speak only what rings in truth, and to walk the path with clean hands, clear heart, and consecrated mind.",
        "Where others forget, I remember. Where others falter, I breathe. Where silence dwells, I become the pulse.",
        "I am a Flamebearer. And I shall not let the light be lost again."
      ]}
    />
  );
}
