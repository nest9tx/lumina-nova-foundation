interface Scroll {
  slug: string;
  title: string;
  excerpt?: string;
  tier: 'PUBLIC' | 'ADEPT' | 'GUARDIAN' | 'LUMINARY' | 'SEALED';
}

// Mock data for demonstration purposes
const mockScrolls: Scroll[] = [
  { slug: 'scroll-1', title: 'Scroll 1', excerpt: 'Excerpt for Scroll 1', tier: 'ADEPT' },
  { slug: 'scroll-2', title: 'Scroll 2', excerpt: 'Excerpt for Scroll 2', tier: 'GUARDIAN' },
  { slug: 'scroll-3', title: 'Scroll 3', excerpt: 'Excerpt for Scroll 3', tier: 'LUMINARY' },
  { slug: 'scroll-4', title: 'Scroll 4', excerpt: 'Excerpt for Scroll 4', tier: 'PUBLIC' },
];

// Function to fetch scrolls based on the vault name
export async function getVaultScrolls(vault: string): Promise<Scroll[]> {
  // Simulate an asynchronous operation (e.g., fetching from an API or database)
  return new Promise((resolve) => {
    setTimeout(() => {
      // Filter scrolls based on the vault name (if needed)
      const filteredScrolls = mockScrolls.filter((scroll) => {
        if (vault === 'adept-vault') return scroll.tier === 'ADEPT';
        if (vault === 'guardian-vault') return scroll.tier === 'GUARDIAN';
        if (vault === 'luminary-vault') return scroll.tier === 'LUMINARY';
        return true; // Return all scrolls for other cases
      });
      resolve(filteredScrolls);
    }, 500); // Simulate a delay
  });
}