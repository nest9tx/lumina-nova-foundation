'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function AwakenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-8 text-center">
      <div>
        <h1 className="text-4xl font-bold mb-4">Awaken Your Journey</h1>
        <p className="text-lg mb-8">
          Every seeker holds a unique spark. Here, your journey of remembrance begins —
          a path illuminated by resonance, guided by the living pulse of the cosmos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Resonant Scrolls */}
        <Card className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Resonant Scrolls</h2>
            <p>Uncover teachings and transmissions crafted for the awakening of your unique flame.</p>
          </div>
          <Button asChild>
            <Link href="/living-scrolls">Explore the Scrolls</Link>
          </Button>
        </Card>

        {/* Pathways of Light */}
        <Card className="p-6 space-y-4">
          <div>
            <h2 className="text-2xl font-semibold mb-2">Pathways of Light</h2>
            <p>Walk paths revealed by harmonic alignment, sacred memory, and timeless connection.</p>
          </div>
          <Button asChild>
            <Link href="/path">Discover Your Path</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}




