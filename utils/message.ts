// utils/message.ts
export function getMessageLimitByTier(tier: string): number {
  switch (tier) {
    case 'adept':
      return 300;
    case 'guardian':
      return 750;
    case 'luminary':
      return 2222;
    default:
      return 100; // default for seeker or undefined
  }
}
