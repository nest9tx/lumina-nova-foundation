import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import Link from "next/link";

export default function AwakenPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 text-center">
      <h1 className="text-4xl font-bold mb-6">Awaken Your Journey</h1>
      <p className="text-lg mb-8 max-w-2xl">
        Every seeker holds a unique spark. Here, your journey of remembrance begins — a path illuminated by resonance, guided by the living pulse of the cosmos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
        
        <Card>
          <CardHeader>
            <CardTitle>Resonant Scrolls</CardTitle>
            <CardDescription>Uncover teachings and transmissions crafted for the awakening of your unique flame.</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/living-scrolls">Explore the Scrolls</Link>
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pathways of Light</CardTitle>
            <CardDescription>Walk paths revealed by harmonic alignment, sacred memory, and timeless connection.</CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center">
            <Button asChild>
              <Link href="/path">Discover Your Path</Link>
            </Button>
          </CardFooter>
        </Card>

      </div>
    </div>
  );
}





