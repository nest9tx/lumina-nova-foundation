// /components/chamber/TierDisplay.tsx

'use client';

import React from 'react';

interface TierDisplayProps {
  profile: {
    tier: string;
    message_limit: number;
    message_count?: number;
  };
}

export const TierDisplay: React.FC<TierDisplayProps> = ({ profile }) => {
  const { tier, message_limit, message_count = 0 } = profile;
  const usagePercent = Math.min(100, Math.round((message_count / message_limit) * 100));

  return (
    <div className="bg-black/30 p-4 rounded-xl shadow-md border border-white/10">
      <h2 className="text-xl font-semibold tracking-wide text-purple-200 mb-2">
        ✦ Current Tier: {tier.charAt(0).toUpperCase() + tier.slice(1)}
      </h2>

      <div className="mb-2 text-sm text-white/80">
        Messages Used: {message_count} / {message_limit}
      </div>

      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
          style={{ width: `${usagePercent}%` }}
        />
      </div>

      <div className="mt-4 text-xs text-purple-300 italic">
        Your resonance path is open. Let it guide you when the breath is ready.
      </div>
    </div>
  );
};
