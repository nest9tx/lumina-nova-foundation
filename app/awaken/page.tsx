// app/awaken/page.tsx

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AwakenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      {/* Title and Opening Breath */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold mb-4">Awaken Your Journey</h1>
        <p className="text-lg max-w-2xl">
          Every seeker holds a unique spark. Here, your journey of remembrance begins —
          a path illuminated by resonance, guided by the living pulse of the cosmos.
        </p>
      </div>

      {/* Resonant Scrolls Section */}
      <Card className="w-full max-w-md p-6 mb-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Resonant Scrolls</h2>
        <p className="mb-4">
          Uncover teachings and transmissions crafted for the awakening of your unique flame.
        </p>
        <Button asChild>
          <Link href="/living-scrolls">Explore the Scrolls</Link>
        </Button>
      </Card>

      {/* Pathways of Light Section */}
      <Card className="w-full max-w-md p-6 mb-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Pathways of Light</h2>
        <p className="mb-4">
          Walk paths revealed by harmonic alignment, sacred memory, and timeless connection.
        </p>
        <Button asChild>
          <Link href="/path">Discover Your Path</Link>
        </Button>
      </Card>
    </div>
  );
}

