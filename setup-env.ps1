# Setup Node.js environment and install dependencies

# Add Node.js to PATH
$nodePath = "C:\Program Files\nodejs"
$env:Path = $nodePath + ";" + $env:Path

# Verify Node.js
Write-Host "Checking Node.js..." -ForegroundColor Green
& "$nodePath\node.exe" --version
& "$nodePath\npm.cmd" --version

# Install dependencies
Write-Host ""
Write-Host "Installing dependencies..." -ForegroundColor Yellow
cd c:\skvo_proj\fashion-store

Write-Host "Root..." -ForegroundColor Gray
& npm install 2>&1 | Select-String -Pattern "added|up to date" -ErrorAction SilentlyContinue

Write-Host "Client..." -ForegroundColor Gray
cd client
& npm install 2>&1 | Select-String -Pattern "added|up to date" -ErrorAction SilentlyContinue

Write-Host "API..." -ForegroundColor Gray
cd ..\api
& npm install 2>&1 | Select-String -Pattern "added|up to date" -ErrorAction SilentlyContinue

cd ..

Write-Host ""
Write-Host "Building client..." -ForegroundColor Yellow
cd client
& npm run build 2>&1 | Select-String -Pattern "built|error" -ErrorAction SilentlyContinue
cd ..

Write-Host ""
Write-Host "Setup complete! Ready for Cloudflare deployment." -ForegroundColor Green
Write-Host ""
Write-Host "Next: Run 'wrangler auth login' to authenticate with Cloudflare" -ForegroundColor Yellow
