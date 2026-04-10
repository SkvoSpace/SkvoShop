#!/usr/bin/env pwsh

# Fashion Store - Quick Deploy to Cloudflare
# This script will deploy your project to Cloudflare Pages & Workers

Write-Host "🚀 Fashion Store Cloudflare Deployment" -ForegroundColor Cyan
Write-Host "======================================" -ForegroundColor Cyan

# Check Node.js
Write-Host "Checking Node.js..." -ForegroundColor Yellow
try {
    $nodeVersion = node --version
    Write-Host "✅ Node.js $nodeVersion found" -ForegroundColor Green
} catch {
    Write-Host "❌ Node.js not found! Please install from https://nodejs.org/" -ForegroundColor Red
    exit 1
}

# Check npm
Write-Host "Checking npm..." -ForegroundColor Yellow
try {
    $npmVersion = npm --version
    Write-Host "✅ npm $npmVersion found" -ForegroundColor Green
} catch {
    Write-Host "❌ npm not found!" -ForegroundColor Red
    exit 1
}

# Install root dependencies
Write-Host "`n📦 Installing root dependencies..." -ForegroundColor Yellow
npm install

# Install client
Write-Host "`n📦 Installing client dependencies..." -ForegroundColor Yellow
cd client
npm install
cd ..

# Install API
Write-Host "`n📦 Installing API dependencies..." -ForegroundColor Yellow
cd api
npm install

# Install global wrangler
Write-Host "`n🔧 Installing Wrangler..." -ForegroundColor Yellow
npm install -g wrangler@latest

cd ..

# Build client
Write-Host "`n🔨 Building client..." -ForegroundColor Yellow
cd client
npm run build
cd ..

Write-Host "`n✅ All dependencies installed!" -ForegroundColor Green
Write-Host "`n📝 Next steps:" -ForegroundColor Cyan
Write-Host "1. Authenticate: npx wrangler auth login" -ForegroundColor White
Write-Host "2. Create D1: cd api && npx wrangler d1 create fashion-db" -ForegroundColor White
Write-Host "3. Run migrations: npx wrangler d1 execute fashion-db --file=./migrations/0001_initial.sql" -ForegroundColor White
Write-Host "4. Deploy API: npx wrangler deploy" -ForegroundColor White
Write-Host "5. Deploy Pages: cd .. && npx wrangler pages deploy client/dist" -ForegroundColor White
