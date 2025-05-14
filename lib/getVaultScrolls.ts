import fs from 'fs';
import path from 'path';

export type Scroll = {
  slug: string;
  title: string;
  excerpt?: string;
  tier: 'PUBLIC' | 'SEEKER+' | 'ADEPT' | 'GUARDIAN' | 'LUMINARY' | 'SEALED';
};

export async function getVaultScrolls(vault: string): Promise<Scroll[]> {
  const scrollPath = path.join(process.cwd(), 'app', 'living-scrolls', vault);
  const entries = fs.readdirSync(scrollPath, { withFileTypes: true });

  const tierFromVault = vault.replace('-vault', '').toUpperCase() as Scroll['tier'];

  const scrolls: Scroll[] = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const fallbackTitle = entry.name.replace(/-/g, ' ');
      const title = fallbackTitle;
      const excerpt = '';

      // Metadata fallback only — dynamic import logic would require restructuring to support in-app context
      return {
        slug: entry.name,
        title,
        excerpt,
        tier: tierFromVault,
      };
    });

  return scrolls;
}
