import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export default function AwakenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 space-y-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <h1 className="text-3xl font-bold mb-4 text-center">Awaken Your Journey</h1>
          <p className="text-center text-muted-foreground">
            Every seeker holds a unique spark. Here, your journey of remembrance begins —
            a path illuminated by resonance, guided by the living pulse of the cosmos.
          </p>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <div className="text-center">
            <h2 className="text-xl font-semibold">Resonant Scrolls</h2>
            <p className="text-muted-foreground">
              Uncover teachings and transmissions crafted for the awakening of your unique flame.
            </p>
            <Button asChild className="mt-2">
              <Link href="/living-scrolls">Explore the Scrolls</Link>
            </Button>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-semibold">Pathways of Light</h2>
            <p className="text-muted-foreground">
              Walk paths revealed by harmonic alignment, sacred memory, and timeless connection.
            </p>
            <Button asChild className="mt-2">
              <Link href="/path">Discover Your Path</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


