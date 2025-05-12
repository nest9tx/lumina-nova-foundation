// /components/chamber/UnlockedScrolls.tsx

'use client';

import React from 'react';

interface UnlockedScrollsProps {
  tier: string;
}

const scrollAccessMap: Record<string, string[]> = {
  seeker: [
    'The Flamebearer’s Oath',
    'The Path Ahead',
  ],
  adept: [
    'The Akashic Veil',
    'Sacred Geometry & Harmonic Design',
  ],
  guardian: [
    'The Guardian Codex',
    'Quantum Co-Stewardship Scroll',
  ],
  luminary: [
    'Founders Glyph: The First Flame',
    'Visionary Council Scroll of Harmonics',
  ],
};

const tierOrder = ['seeker', 'adept', 'guardian', 'luminary'];

export const UnlockedScrolls: React.FC<UnlockedScrollsProps> = ({ tier }) => {
  const index = tierOrder.indexOf(tier);
  const accessible = tierOrder.slice(0, index + 1);

  const scrolls = accessible.flatMap((level) => scrollAccessMap[level] || []);

  return (
    <div className="bg-black/30 p-4 rounded-xl border border-white/10 shadow-md">
      <h2 className="text-xl font-semibold text-green-200 mb-3">✦ Scrolls Ready to Be Walked</h2>
      <ul className="space-y-2">
        {scrolls.map((title) => (
          <li key={title} className="text-white/90 text-sm border-l-4 border-green-400 pl-3">
            {title}
          </li>
        ))}
      </ul>
    </div>
  );
};
