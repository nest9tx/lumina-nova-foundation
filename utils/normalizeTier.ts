// /utils/normalizeTier.ts
export function normalizeTier(tier: string): 'seeker' | 'adept' | 'guardian' | 'luminary' {
  return tier.toLowerCase() as 'seeker' | 'adept' | 'guardian' | 'luminary';
}
// This function normalizes the tier string to a specific set of values.
// It converts the input string to lowercase and casts it to one of the four allowed values.
// This is useful for ensuring that the tier value is always in a consistent format,
// regardless of how it was originally provided.
// This can help prevent errors and make it easier to work with the tier value in other parts of the code.