#!/bin/bash
# Fashion Store Auto-Deploy Script for Mac/Linux

echo "🚀 Fashion Store Cloudflare Deployment"
echo "======================================"

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found! Install from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js $(node --version) found"

# Install dependencies
echo -e "\n📦 Installing dependencies..."
npm install
cd client && npm install && cd ..
cd api && npm install && cd ..

# Install wrangler
echo -e "\n🔧 Installing Wrangler..."
npm install -g wrangler@latest

# Build
echo -e "\n🔨 Building client..."
cd client
npm run build
cd ..

echo -e "\n✅ Build complete!"
echo -e "\n📝 Next steps:"
echo "1. npx wrangler auth login"
echo "2. cd api && npx wrangler d1 create fashion-db"
echo "3. npx wrangler d1 execute fashion-db --file=./migrations/0001_initial.sql"
echo "4. npx wrangler deploy"
echo "5. cd .. && npx wrangler pages deploy client/dist"
