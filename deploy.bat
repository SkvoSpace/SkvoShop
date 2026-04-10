@echo off
REM Fashion Store - Deploy to skvoshop.skvo-space.workers.dev

setlocal EnableDelayedExpansion
set "RESET=[0m"
set "CYAN=[36m"
set "GREEN=[32m"
set "YELLOW=[33m"
set "RED=[31m"

cls
echo.
echo %CYAN%===============================================%RESET%
echo %CYAN%  Fashion Store - Deploy to Cloudflare Workers%RESET%
echo %CYAN%===============================================%RESET%
echo.
echo Target: https://skvoshop.skvo-space.workers.dev/
echo.

REM Check Node.js
echo %YELLOW%[1/7] Checking Node.js...%RESET%
node --version >nul 2>&1
if errorlevel 1 (
    echo %RED%ERROR: Node.js not found!%RESET%
    echo Please download and install from: https://nodejs.org/dist/v25.9.0/node-v25.9.0-x64.msi
    echo Then restart this script.
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do (
    echo %GREEN%✓ Node.js %%i%RESET%
)

REM Check npm
echo %YELLOW%[2/7] Checking npm...%RESET%
npm --version >nul 2>&1
if errorlevel 1 (
    echo %RED%ERROR: npm not found!%RESET%
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('npm --version') do (
    echo %GREEN%✓ npm %%i%RESET%
)

REM Install root dependencies
echo %YELLOW%[3/7] Installing root dependencies...%RESET%
call npm install
if errorlevel 1 (
    echo %RED%ERROR: npm install failed!%RESET%
    pause
    exit /b 1
)
echo %GREEN%✓ Root dependencies installed%RESET%

REM Install client
echo %YELLOW%[4/7] Installing client dependencies...%RESET%
cd client
call npm install
if errorlevel 1 (
    echo %RED%ERROR: Client install failed!%RESET%
    cd ..
    pause
    exit /b 1
)
call npm run build
if errorlevel 1 (
    echo %RED%ERROR: Client build failed!%RESET%
    cd ..
    pause
    exit /b 1
)
cd ..
echo %GREEN%✓ Client built%RESET%

REM Install API
echo %YELLOW%[5/7] Installing API dependencies...%RESET%
cd api
call npm install
if errorlevel 1 (
    echo %RED%ERROR: API install failed!%RESET%
    cd ..
    pause
    exit /b 1
)
cd ..
echo %GREEN%✓ API dependencies installed%RESET%

REM Install wrangler
echo %YELLOW%[6/7] Installing Wrangler CLI (global)...%RESET%
call npm install -g wrangler@latest >nul 2>&1
echo %GREEN%✓ Wrangler installed%RESET%

REM Auth
echo %YELLOW%[7/7] Ready to deploy!%RESET%
echo.
echo %CYAN%Next steps:%RESET%
echo 1. Run: wrangler auth login
echo 2. Run: cd api
echo 3. Run: wrangler d1 create fashion-db
echo 4. Copy database_id to api/wrangler.toml
echo 5. Run: wrangler d1 execute fashion-db --file=./migrations/0001_initial.sql
echo 6. Run: wrangler deploy
echo 7. Run: cd .. && wrangler pages deploy client/dist
echo.
echo %GREEN%✓ All dependencies ready!%RESET%
echo %CYAN%Your site will be live at: https://skvoshop.skvo-space.workers.dev/%RESET%
echo.
pause
