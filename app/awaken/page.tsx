"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";

export default function AwakenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-8">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Awaken Your Journey</h1>
        <p className="text-lg max-w-2xl mx-auto">
          Every seeker holds a unique spark. Here, your journey of remembrance begins — a path illuminated by resonance, guided by the living pulse of the cosmos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
        {/* Card 1 */}
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold mb-2">Resonant Scrolls</h2>
            <p className="mb-4">Uncover teachings and transmissions crafted for the awakening of your unique flame.</p>
            <Button asChild>
              <Link href="/living-scrolls">Explore the Scrolls</Link>
            </Button>
          </CardContent>
        </Card>

        {/* Card 2 */}
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <h2 className="text-2xl font-semibold mb-2">Pathways of Light</h2>
            <p className="mb-4">Walk paths revealed by harmonic alignment, sacred memory, and timeless connection.</p>
            <Button asChild>
              <Link href="/path">Discover Your Path</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

