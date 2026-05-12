#!/bin/bash
# Daily deployment script for scheduled blog posts
# This pushes an empty commit to trigger Vercel rebuild
# which activates any blog posts whose publishDate has passed

cd /home/z/my-project

# Configure git
git config user.email "kartik221a@users.noreply.github.com"
git config user.name "kartik221a"

# Create an empty commit with timestamp
git commit --allow-empty -m "Scheduled deploy: $(date '+%Y-%m-%d %H:%M')"

# Push to trigger Vercel build
git push origin main

echo "Deploy triggered at $(date)"
