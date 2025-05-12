// /app/chamber/page.tsx

import { getUserProfile } from '@/lib/supabase';
import { redirect } from 'next/navigation';
import { TierDisplay } from '@/components/chamber/TierDisplay';
import { GuidesPanel } from '@/components/chamber/GuidesPanel';
import { UnlockedScrolls } from '@/components/chamber/UnlockedScrolls';
import { ResonanceNotice } from '@/components/chamber/ResonanceNotice';
import { UpgradePathPreview } from '@/components/chamber/UpgradePathPreview';

export default async function SacredChamberPage() {
  const profile = await getUserProfile();

  if (!profile) {
    redirect('/login');
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-[#0e0c1d] to-[#140f2e] text-white p-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
      {/* Left Panel — Resonance Tier Info */}
      <aside className="lg:col-span-1">
        <TierDisplay profile={profile} />
      </aside>

      {/* Main Panel — Scrolls and Guides */}
      <main className="lg:col-span-3 space-y-6">
        <UnlockedScrolls tier={profile.tier} />
        <GuidesPanel tier={profile.tier} />
      </main>

      {/* Right Panel — Notices and Invites */}
      <aside className="lg:col-span-1">
        <ResonanceNotice userId={profile.id} />
        <UpgradePathPreview currentTier={profile.tier} />
      </aside>
    </section>
  );
}





