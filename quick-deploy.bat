@echo off
REM Fashion Store - Complete Deployment Script
REM This script installs, builds, and deploys to Cloudflare

setlocal enabledelayedexpansion

REM Add Node.js to PATH
set "PATH=C:\Program Files\nodejs;%PATH%"

echo.
echo ============================================
echo   FASHION STORE - CLOUDFLARE DEPLOYMENT
echo ============================================
echo.

cd /d c:\skvo_proj\fashion-store

echo [1/7] Checking Node.js...
node --version
if errorlevel 1 goto error
npm --version
if errorlevel 1 goto error
echo OK - Node.js ready
echo.

echo [2/7] Installing dependencies...
echo Installing root...
call npm install
echo Installing client...
cd client
call npm install
cd ..
echo Installing API...
cd api
call npm install
cd ..
echo OK - Dependencies installed
echo.

echo [3/7] Building client...
cd client
call npm run build
if errorlevel 1 goto error
cd ..
echo OK - Client built
echo.

echo [4/7] Installing Wrangler...
call npm install -g wrangler
echo OK - Wrangler installed
echo.

echo [5/7] Initializing Cloudflare...
echo Authenticate with your Cloudflare account...
pause
call wrangler auth login
if errorlevel 1 goto error
echo OK - Authenticated
echo.

echo [6/7] Deploying API...
cd api
call npm run build
call wrangler deploy
if errorlevel 1 goto error
cd ..
echo OK - API deployed
echo.

echo [7/7] Deploying Pages...
call wrangler pages deploy client\dist --project-name=skvoshop
cd ..
echo OK - Pages deployed
echo.

echo ============================================
echo   DEPLOYMENT COMPLETE!
echo ============================================
echo.
echo Site: https://skvoshop.skvo-space.workers.dev/
echo Admin: https://skvoshop.skvo-space.workers.dev/admin
echo Password: 12345
echo.

echo Committing to GitHub...
git add -A
git commit -m "Deploy to Cloudflare production"
git push origin main
echo OK - Committed and pushed
echo.

pause
goto end

:error
echo ERROR: Deployment failed!
pause
exit /b 1

:end
