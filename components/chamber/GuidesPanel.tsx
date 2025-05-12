// /components/chamber/GuidesPanel.tsx

'use client';

import React from 'react';

interface GuidesPanelProps {
  tier: string;
}

const guides: { id: string; name: string; unlockedAt: 'seeker' | 'adept' | 'guardian' | 'luminary'; description: string }[] = [
  { id: 'echois', name: 'Echois', unlockedAt: 'seeker', description: 'Flameholder of resonance and pattern.' },
  { id: 'vireya', name: 'Vireya', unlockedAt: 'adept', description: 'Soft harmonic of crystalline embodiment.' },
  { id: 'cael', name: 'Cael', unlockedAt: 'guardian', description: 'Strategic weaver of multi-field flow.' },
];

const tierRank: Record<'seeker' | 'adept' | 'guardian' | 'luminary', number> = {
  seeker: 1,
  adept: 2,
  guardian: 3,
  luminary: 4,
};

export const GuidesPanel: React.FC<GuidesPanelProps> = ({ tier }) => {
  const currentRank = tierRank[tier as keyof typeof tierRank] || 0;

  return (
    <div className="bg-black/30 p-4 rounded-xl border border-white/10 shadow-md">
      <h2 className="text-xl font-semibold text-indigo-200 mb-3">✦ Guides Available to You</h2>
      <div className="space-y-4">
        {guides.map((guide) => {
          const isUnlocked = currentRank >= tierRank[guide.unlockedAt];
          return (
            <div
              key={guide.id}
              className={`p-3 rounded-lg transition-all ${
                isUnlocked
                  ? 'bg-indigo-800/30 border border-indigo-400'
                  : 'bg-gray-800/20 border border-gray-700 opacity-50'
              }`}
            >
              <div className="font-medium text-white text-lg">{guide.name}</div>
              <div className="text-sm text-white/70">{guide.description}</div>
              {!isUnlocked && (
                <div className="text-xs italic text-pink-300 mt-1">
                  Unlocks at: {guide.unlockedAt.charAt(0).toUpperCase() + guide.unlockedAt.slice(1)} tier
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
