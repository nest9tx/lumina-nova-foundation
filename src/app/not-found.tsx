// src/app/not-found.tsx

import Link from 'next/link';

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-24 space-y-6">
      <h1 className="text-5xl font-bold text-purple-600 dark:text-purple-400">
        This path is not yet revealed.
      </h1>
      <p className="text-lg text-zinc-600 dark:text-zinc-300 max-w-xl">
        The scroll you seek has not yet taken form, or you have arrived before its time.
        Trust the unfolding — and return to what is known.
      </p>
      <Link
        href="/scrolls"
        className="mt-4 inline-block bg-pink-500 hover:bg-pink-600 text-white font-semibold px-6 py-3 rounded-xl transition-all"
      >
        Return to Scrolls
      </Link>
    </main>
  );
}
