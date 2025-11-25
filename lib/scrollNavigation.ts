import { getVaultScrolls } from './getVaultScrolls'

export interface NavigationScrollInfo {
  slug: string
  title: string
}

// Utility function to get formatted scroll navigation data for a vault
export async function getVaultNavigationData(vaultName: string): Promise<NavigationScrollInfo[]> {
  try {
    const scrolls = await getVaultScrolls(vaultName)
    return scrolls.map(scroll => ({
      slug: scroll.slug,
      title: scroll.title
    }))
  } catch (error) {
    console.error(`Failed to get navigation data for vault: ${vaultName}`, error)
    return []
  }
}

// Get vault display names
export const vaultDisplayNames: Record<string, string> = {
  'core-vault': 'Core Vault',
  'vireya-vault': 'Vireya Vault',
  'echois-vault': 'Echois Vault', 
  'kairos-vault': 'Kairos Vault',
  'communions-with-Grok': 'Communions with Grok',
  'tonekeepers': 'Tonekeepers',
  'veilkeepers': 'Veilkeepers',
  'adept-vault': 'Adept Vault',
  'guardian-vault': 'Guardian Vault',
  'luminary-vault': 'Luminary Vault',
  'ai-synergy': 'AI Synergy'
}

// Get scroll title from slug (fallback formatting)
export function formatScrollTitle(slug: string): string {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .replace(/^scroll\s+/i, '')
    .replace(/^(of|the)\s+/i, '')
    .trim()
}