#!/bin/bash

echo "🌬️  Lumina Nova Backup Script Starting..."

# Prompt for backup description
read -p "Enter a short description for this backup: " description

# Format the date
date=$(date +%Y-%m-%d)

# Format the branch name
branch_name="backup/$date-$description"

# Create new backup branch
echo "🔄 Creating backup branch: $branch_name"
git checkout -b "$branch_name"

# Stage all changes
git add .

# Commit with message
git commit -m "Backup: $description ($date)"

# Push branch to origin
git push origin "$branch_name"

echo "✅ Backup branch pushed successfully: $branch_name"

# Confirm next steps
echo "You may now safely continue with risky changes. 🌱"


