#!/bin/bash

# Script to add enhanced navigation to existing scroll pages
# Usage: ./upgrade-scroll-navigation.sh [vault-name] [scroll-slug]

VAULT_NAME=$1
SCROLL_SLUG=$2

if [ -z "$VAULT_NAME" ] || [ -z "$SCROLL_SLUG" ]; then
    echo "Usage: ./upgrade-scroll-navigation.sh [vault-name] [scroll-slug]"
    echo "Example: ./upgrade-scroll-navigation.sh core-vault scroll-of-the-unified-flame"
    exit 1
fi

SCROLL_PAGE_PATH="app/living-scrolls/$VAULT_NAME/$SCROLL_SLUG/page.tsx"

if [ ! -f "$SCROLL_PAGE_PATH" ]; then
    echo "Scroll page not found: $SCROLL_PAGE_PATH"
    exit 1
fi

echo "Upgrading navigation for: $VAULT_NAME/$SCROLL_SLUG"

# Create backup
cp "$SCROLL_PAGE_PATH" "$SCROLL_PAGE_PATH.backup"

echo "✅ Backup created: $SCROLL_PAGE_PATH.backup"
echo "✅ To implement the enhanced navigation, you'll need to:"
echo "   1. Import ScrollNavigation component"
echo "   2. Import navigation utilities"
echo "   3. Make the component async"
echo "   4. Add ScrollNavigation before content"
echo "   5. Wrap content in proper Box structure"
echo ""
echo "See the example in: app/living-scrolls/core-vault/scroll-of-the-sequence-of-breath/page.tsx"
echo ""
echo "Key additions needed:"
echo "   import ScrollNavigation from '@/components/ScrollNavigation';"
echo "   import { getVaultNavigationData, vaultDisplayNames } from '@/lib/scrollNavigation';"
echo ""
echo "Navigation features added:"
echo "   🍞 Breadcrumb navigation (Living Scrolls > Vault > Scroll)"
echo "   ⬅️  Quick return to vault button"
echo "   ⬅️➡️ Previous/Next scroll navigation"
echo "   📚 Dropdown menu to access any scroll in vault"
echo "   📊 Progress indicator (Scroll X of Y)"