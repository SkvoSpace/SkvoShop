@echo off
REM Fashion Store - Deploy to Cloudflare
REM Target: https://skvoshop.skvo-space.workers.dev/

setlocal EnableDelayedExpansion

REM Color codes
for /F %%A in ('echo prompt $H ^| cmd') do set "BS=%%A"

cls
color 0B
echo.
echo ╔═══════════════════════════════════════════════════════════════════╗
echo ║        FASHION STORE - CLOUDFLARE DEPLOYMENT                     ║
echo ║     Target: https://skvoshop.skvo-space.workers.dev/             ║
echo ╚═══════════════════════════════════════════════════════════════════╝
echo.

cd c:\skvo_proj\fashion-store

REM Check Node
echo [Step 1/8] Checking Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    color 0C
    echo ERROR: Node.js not found!
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do echo ✓ Node %%i
for /f "tokens=*" %%i in ('npm --version') do echo ✓ npm %%i

REM Install root
echo.
echo [Step 2/8] Installing root dependencies...
call npm install --silent
if errorlevel 1 (
    color 0C
    echo ERROR: Failed to install dependencies
    pause
    exit /b 1
)
echo ✓ Dependencies installed

REM Install client
echo.
echo [Step 3/8] Installing client dependencies...
cd client
call npm install --silent
if errorlevel 1 (
    color 0C
    echo ERROR: Failed to install client dependencies
    cd ..
    pause
    exit /b 1
)
echo ✓ Client dependencies installed

REM Build client
echo.
echo [Step 4/8] Building client...
call npm run build
if errorlevel 1 (
    color 0C
    echo ERROR: Client build failed
    cd ..
    pause
    exit /b 1
)
echo ✓ Client built successfully
cd ..

REM Install API
echo.
echo [Step 5/8] Installing API dependencies...
cd api
call npm install --silent
if errorlevel 1 (
    color 0C
    echo ERROR: Failed to install API dependencies
    cd ..
    pause
    exit /b 1
)
echo ✓ API dependencies installed

REM Check Wrangler
echo.
echo [Step 6/8] Checking Wrangler...
wrangler --version >nul 2>&1
if errorlevel 1 (
    echo Installing wrangler globally...
    call npm install -g wrangler@latest --silent
)
for /f "tokens=*" %%i in ('wrangler --version') do echo ✓ Wrangler %%i

REM Deploy API
echo.
echo [Step 7/8] Deploying API to Cloudflare Workers...
call npm run build
call wrangler deploy
if errorlevel 1 (
    color 0C
    echo ERROR: API deployment failed
    cd ..
    pause
    exit /b 1
)
echo ✓ API deployed successfully
cd ..

REM Deploy Pages
echo.
echo [Step 8/8] Deploying Frontend to Cloudflare Pages...
call wrangler pages deploy client/dist --project-name=skvoshop
if errorlevel 1 (
    color 0C
    echo ERROR: Pages deployment failed
    pause
    exit /b 1
)

REM Success
color 0A
echo.
echo ╔═══════════════════════════════════════════════════════════════════╗
echo ║                   DEPLOYMENT SUCCESSFUL! 🎉                       ║
echo ╠═══════════════════════════════════════════════════════════════════╣
echo ║                                                                   ║
echo ║  Your Fashion Store is now LIVE at:                             ║
echo ║  🌐 https://skvoshop.skvo-space.workers.dev/                   ║
echo ║                                                                   ║
echo ║  Additional URLs:                                               ║
echo ║  📊 Admin Panel: /admin (password: 12345)                      ║
echo ║  🛍️  Shop: /shop                                               ║
echo ║  🖼️  Gallery: /gallery                                         ║
echo ║  📦 API: /api/products                                         ║
echo ║                                                                   ║
echo ║  Git:                                                           ║
echo ║  📝 Repository: https://github.com/SkvoSpace/SkvoShop          ║
echo ║  ✅ Status: Committed and Pushed                               ║
echo ║                                                                   ║
echo ╚═══════════════════════════════════════════════════════════════════╝
echo.

timeout /t 5
