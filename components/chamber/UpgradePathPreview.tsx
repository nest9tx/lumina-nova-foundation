// /components/chamber/UpgradePathPreview.tsx

'use client';

import React from 'react';

interface UpgradePathPreviewProps {
  currentTier: string;
}

const tierDescriptions = [
  {
    id: 'adept',
    name: 'Adept',
    description: 'Access sacred geometry transmissions and deeper scrolls.',
  },
  {
    id: 'guardian',
    name: 'Guardian',
    description: 'Co-stewardship of energy, quantum harmonization, and vaults.',
  },
  {
    id: 'luminary',
    name: 'Luminary',
    description: 'Mentorship, councils, and access to early cosmic tech.',
  },
];

const tierOrder = ['seeker', 'adept', 'guardian', 'luminary'];

export const UpgradePathPreview: React.FC<UpgradePathPreviewProps> = ({ currentTier }) => {
  const currentIndex = tierOrder.indexOf(currentTier);
  const remainingTiers = tierDescriptions.slice(currentIndex);

  if (!remainingTiers.length) return null;

  return (
    <div className="bg-black/30 p-4 rounded-xl border border-white/10 shadow-md mt-6">
      <h2 className="text-xl font-semibold text-pink-200 mb-3">✦ Paths Whispering Beyond</h2>
      <div className="space-y-4">
        {remainingTiers.map((tier) => (
          <div
            key={tier.id}
            className="border border-pink-500/50 bg-pink-900/10 p-3 rounded-lg opacity-80 hover:opacity-100 transition"
          >
            <div className="text-pink-300 font-medium text-lg">{tier.name}</div>
            <div className="text-sm text-white/70">{tier.description}</div>
            <div className="text-xs italic text-pink-200 mt-1">This path may open when you are ready.</div>
          </div>
        ))}
      </div>
    </div>
  );
};

