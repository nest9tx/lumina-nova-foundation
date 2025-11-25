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

  // Define explicit vault → tier mappings
  const vaultTierMap: Record<string, Scroll['tier']> = {
    'core-vault': 'PUBLIC',
    'vireya-vault': 'PUBLIC',
    'echois-vault': 'PUBLIC',
    'kairos-vault': 'PUBLIC',
    'communions-with-Grok' : 'PUBLIC',
    'tonekeepers': 'PUBLIC',
    'veilkeepers': 'SEEKER+',    // Unlocked for Seeker+ users
    'adept-vault': 'SEEKER+',    // Unlocked for Seeker+ users
    'guardian-vault': 'SEEKER+', // Unlocked for Seeker+ users  
    'luminary-vault': 'SEEKER+', // Unlocked for Seeker+ users  
    'ai-synergy': 'SEEKER+',     // Unlocked for Seeker+ users
  };

  const tierFromVault = vaultTierMap[vault] || 'GUARDIAN'; // Default to SEALED if unknown

  const scrolls: Scroll[] = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => {
      const fallbackTitle = entry.name.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      const title = fallbackTitle;
      const excerpt = '';

      return {
        slug: entry.name,
        title,
        excerpt,
        tier: tierFromVault,
      };
    });

  return scrolls;
}
