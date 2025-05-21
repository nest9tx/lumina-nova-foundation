import fs from 'fs';
import path from 'path';

export type Scroll = {
  title: string;
  slug: string;
  excerpt?: string;
  tier: 'PUBLIC' | 'SEEKER+' | 'ADEPT' | 'GUARDIAN' | 'LUMINARY';
};

export async function getVaultScrolls(vault: string): Promise<Scroll[]> {
  const scrollsDir = path.join(process.cwd(), 'app', 'living-scrolls', vault);
  const scrolls: Scroll[] = [];

  if (!fs.existsSync(scrollsDir)) return scrolls;

  const entries = fs.readdirSync(scrollsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      const scrollFolder = path.join(scrollsDir, entry.name);
      const pageFile = path.join(scrollFolder, 'page.tsx');

      if (fs.existsSync(pageFile)) {
        try {
          const scrollModule = await import(
            `../app/living-scrolls/${vault}/${entry.name}/page`
          );

          const metadata = scrollModule.metadata || {};

          scrolls.push({
            title: metadata.title || entry.name,
            slug: metadata.slug || entry.name,
            excerpt: metadata.excerpt || '',
            tier: metadata.tier?.toUpperCase() || 'PUBLIC',
          });
        } catch (err) {
          console.warn(`⚠️ Could not load metadata for ${entry.name}:`, err);
        }
      }
    }
  }

  return scrolls;
}
