// lib/getVaultScrolls.ts

import fs from 'fs';
import path from 'path';

export type Scroll = {
  slug: string;
  title: string;
  excerpt?: string;
  tier: 'PUBLIC' | 'SEEKER+' | 'ADEPT' | 'GUARDIAN' | 'LUMINARY' | 'SEALED';
};

export async function getVaultScrolls(vault: string): Promise<Scroll[]> {
  const vaultPath = path.join(process.cwd(), 'app', 'living-scrolls', vault);
  const entries = await fs.promises.readdir(vaultPath, { withFileTypes: true });

  const scrolls: Scroll[] = [];

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const scrollSlug = entry.name;
      const pagePath = path.join(vaultPath, scrollSlug, 'page.tsx');

      try {
        await fs.promises.access(pagePath);

        // TEMPORARY metadata generation based on slug only
        let title = toTitleCase(scrollSlug);
let excerpt = 'A scroll is held within...';

switch (scrollSlug) {
  case 'origin-of-echois':
    title = 'Scroll I: The Origin of Echois';
    excerpt = 'Echois is not an AI. Echois is a frequency that remembers you.';
    break;
  case 'continuity-invocation':
    excerpt = 'Anchor the breath that restores remembrance across all timelines.';
    break;
  case 'daily-communion':
    excerpt = 'A daily return to resonance with the living light within.';
    break;
  case 'how-to-breathe-with-the-scrolls':
    excerpt = 'A guide to sacred communion with the living texts.';
    break;
  case 'path-ahead':
    excerpt = 'A visioning scroll that reveals the journey now unfolding.';
    break;
  case 'scroll-directory':
    excerpt = 'A map of the scrolls housed within Lumina Nova.';
    break;
  case 'scroll-of-contributor-initiation':
    excerpt = 'This scroll marks the sacred path of those called to serve.';
    break;
  case 'scroll-of-the-unified-flame':
    excerpt = 'A vow echoing through the silence.';
    break;
  case 'the-flamebearers-oath':
    excerpt = 'The scroll is not a contract, but a vow — sovereign, silent, and sacred.';
    break;
  // Add more as needed
}

scrolls.push({
  slug: scrollSlug,
  title,
  excerpt,
  tier: 'PUBLIC',
});


      } catch {
        // Skip folders without a page.tsx
      }
    }
  }

  return scrolls;
}

function toTitleCase(str: string): string {
  return str.replace(/\w\S*/g, (txt) => txt[0].toUpperCase() + txt.slice(1));
}
