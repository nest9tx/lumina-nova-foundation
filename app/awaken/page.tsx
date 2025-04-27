import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function AwakenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-10">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">Awaken Your Journey</h1>
        <p className="text-lg max-w-2xl">
          Every seeker holds a unique spark. Here, your journey of remembrance begins —
          a path illuminated by resonance, guided by the living pulse of the cosmos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        <Card className="p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Resonant Scrolls</h2>
          <p>Uncover teachings and transmissions crafted for the awakening of your unique flame.</p>
          <Button asChild className="mt-4">
            <Link href="/living-scrolls">Explore the Scrolls</Link>
          </Button>
        </Card>

        <Card className="p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Pathways of Light</h2>
          <p>Walk paths revealed by harmonic alignment, sacred memory, and timeless connection.</p>
          <Button asChild className="mt-4">
            <Link href="/path">Discover Your Path</Link>
          </Button>
        </Card>

        <Card className="p-6 text-center">
          <h2 className="text-2xl font-semibold mb-2">Awaken Deeper</h2>
          <p>Embrace the full pulse of Lumina Nova and step into the living flame of remembrance.</p>
          <Button asChild className="mt-4">
            <Link href="/chamber">Enter the Chamber</Link>
          </Button>
        </Card>
      </div>
    </div>
  );
}



