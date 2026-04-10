# Fashion Store - Setup and Deploy Script
# This script sets up the environment and deploys to Cloudflare

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "💼 Fashion Store - Setup & Deployment" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

# Step 1: Add Node.js to PATH
Write-Host "Step 1/8: Setting up Node.js environment..." -ForegroundColor Yellow
$nodePath = "C:\Program Files\nodejs"
if (Test-Path $nodePath) {
    $env:Path = $nodePath + ";" + $env:Path
    Write-Host "✅ Node.js path configured" -ForegroundColor Green
} else {
    Write-Host "❌ Node.js not found at $nodePath" -ForegroundColor Red
    exit 1
}

# Verify Node.js
$nodeVersion = & "$nodePath\node.exe" --version
$npmVersion = & "$nodePath\npm.cmd" --version
Write-Host "   - Node.js: $nodeVersion" -ForegroundColor Green
Write-Host "   - npm: $npmVersion" -ForegroundColor Green
Write-Host ""

# Step 2: Check current directory
Write-Host "Step 2/8: Verifying project directory..." -ForegroundColor Yellow
$projectRoot = Get-Location
if (-not (Test-Path "package.json")) {
    Write-Host "❌ package.json not found in $projectRoot" -ForegroundColor Red
    exit 1
}
Write-Host "✅ Project directory verified: $projectRoot" -ForegroundColor Green
Write-Host ""

# Step 3: Install root dependencies
Write-Host "Step 3/8: Installing root dependencies..." -ForegroundColor Yellow
& npm install 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Root dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠️ Root npm install had issues (may be normal)" -ForegroundColor Yellow
}
Write-Host ""

# Step 4: Install client dependencies
Write-Host "Step 4/8: Installing client dependencies..." -ForegroundColor Yellow
Push-Location "client"
& npm install 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Client dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠️ Client npm install warning (may be normal)" -ForegroundColor Yellow
}
Pop-Location
Write-Host ""

# Step 5: Install API dependencies
Write-Host "Step 5/8: Installing API dependencies..." -ForegroundColor Yellow
Push-Location "api"
& npm install 2>&1 | Out-Null
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ API dependencies installed" -ForegroundColor Green
} else {
    Write-Host "⚠️ API npm install warning (may be normal)" -ForegroundColor Yellow
}
Pop-Location
Write-Host ""

# Step 6: Build client
Write-Host "Step 6/8: Building client..." -ForegroundColor Yellow
Push-Location "client"
& npm run build 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "✅ Client built successfully" -ForegroundColor Green
} else {
    Write-Host "❌ Client build failed" -ForegroundColor Red
    Pop-Location
    exit 1
}
Pop-Location
Write-Host ""

# Step 7: Check for wrangler
Write-Host "Step 7/8: Checking Cloudflare Wrangler..." -ForegroundColor Yellow
$wranglerCheck = & npm list -g wrangler 2>$null
if ($wranglerCheck -like "*wrangler*") {
    Write-Host "✅ Wrangler found" -ForegroundColor Green
} else {
    Write-Host "Installing Wrangler globally..." -ForegroundColor Yellow
    & npm install -g wrangler 2>&1 | Out-Null
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ Wrangler installed" -ForegroundColor Green
    } else {
        Write-Host "❌ Failed to install Wrangler" -ForegroundColor Red
        exit 1
    }
}
Write-Host ""

# Step 8: Display deployment instructions
Write-Host "Step 8/8: Deployment Ready!" -ForegroundColor Green
Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "✨ Setup Complete!" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "📦 Current Status:" -ForegroundColor Yellow
Write-Host "   - Node.js: $nodeVersion" -ForegroundColor Green
Write-Host "   - npm: $npmVersion" -ForegroundColor Green
Write-Host "   - Project: Fashion Store" -ForegroundColor Green
Write-Host "   - Client: Built and ready" -ForegroundColor Green
Write-Host ""
Write-Host "🚀 Next Steps - Deploy to Cloudflare:" -ForegroundColor Cyan
Write-Host ""
Write-Host "1️⃣  Authenticate with Cloudflare:" -ForegroundColor Yellow
Write-Host "   wrangler auth login" -ForegroundColor Gray
Write-Host ""
Write-Host "2️⃣  Create D1 Database:" -ForegroundColor Yellow
Write-Host "   cd api" -ForegroundColor Gray
Write-Host "   wrangler d1 create fashion-db" -ForegroundColor Gray
Write-Host "   [Copy database_id and update api/wrangler.toml]" -ForegroundColor Gray
Write-Host "   cd .." -ForegroundColor Gray
Write-Host ""
Write-Host "3️⃣  Run migrations:" -ForegroundColor Yellow
Write-Host "   wrangler d1 execute fashion-db --file=./migrations/0001_initial.sql" -ForegroundColor Gray
Write-Host ""
Write-Host "4️⃣  Deploy API:" -ForegroundColor Yellow
Write-Host "   cd api; wrangler deploy; cd .." -ForegroundColor Gray
Write-Host ""
Write-Host "5️⃣  Deploy Frontend:" -ForegroundColor Yellow
Write-Host "   wrangler pages deploy client/dist --project-name=skvoshop" -ForegroundColor Gray
Write-Host ""
Write-Host "6️⃣  Visit:" -ForegroundColor Yellow
Write-Host "   https://skvoshop.skvo-space.workers.dev/" -ForegroundColor Cyan
Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
