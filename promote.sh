#!/bin/bash
echo "🚀 INITIALIZING PROMOTION TO LIVE SITE..."

# 1. Make sure we have the latest dev code
git checkout dev
git pull origin dev

# 2. Switch to main
git checkout main
git pull origin main

# 3. Merge dev into main
git merge dev

# 4. Push to Live
git push origin main

# 5. Go back to dev for next work
git checkout dev

echo "✅ DEPLOYMENT SUCCESSFUL. LIVE SITE UPDATING."
