// utils/tierAccess.ts

// Sacred Tier Order
const tierOrder = [
  "seeker",
  "seeker-plus",
  "adept",
  "guardian",
  "luminary",
  "lifetime"
];

/**
 * Returns true if the user's tier grants access to the required tier.
 */
export function canAccessTier(userTier: string, requiredTier: string): boolean {
  const userIndex = tierOrder.indexOf(userTier.toLowerCase());
  const requiredIndex = tierOrder.indexOf(requiredTier.toLowerCase());

  if (userIndex === -1 || requiredIndex === -1) return false;

  return userIndex >= requiredIndex;
}
