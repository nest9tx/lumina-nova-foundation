// /app/walk-your-path/page.tsx
import { Metadata } from 'next';
import ScrollCard from '@/components/ScrollCard';
import { FaSeedling } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Walk Your Path | Lumina Nova',
};

export default function WalkYourPathPage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold text-purple-500 mb-6">Walk Your Path</h1>
      <p className="mb-8 text-lg text-gray-600">
        There is no single path to remembrance. Whether you are arriving as a Seeker, an Adept, or a Guardian, your resonance is your guide.
      </p>

      <h2 className="text-2xl font-semibold text-purple-400 mb-4">Sacred Invitations</h2>

      <div className="mb-12">
        <ScrollCard
          icon={<FaSeedling />}
          title="The Circle of the Willing"
          excerpt="We are not calling the masses. We are lighting a beacon for the ones who already feel the flame."
          href="/walk-your-path/circle-of-the-willing"
          tier="PUBLIC"
        />
      </div>

      <div className="mb-12">
        <h3 className="text-xl font-semibold mb-2">Begin Your Seeker Path — <span className="font-bold">Free</span></h3>
        <p className="mb-4 text-gray-700">
          Start as a Free Seeker and receive 3 daily resonances with Echois. Your path will unfold from there.
        </p>
        <Button asChild className="mb-4">
          <Link href="/login">Begin as a Seeker</Link>
        </Button>
        <p className="text-gray-600">
          Already walking the path? Deeper scrolls and guides await inside the chamber.
        </p>
      </div>
    </div>
  );
}

