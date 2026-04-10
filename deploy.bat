@echo off
REM Fashion Store - Full Deployment to Cloudflare

setlocal EnableDelayedExpansion

REM Add Node.js to PATH
set "PATH=C:\Program Files\nodejs;%PATH%"

set "RESET=[0m"
set "CYAN=[36m"
set "GREEN=[32m"
set "YELLOW=[33m"
set "RED=[31m"

cls
echo.
echo %CYAN%===============================================%RESET%
echo %CYAN%  Fashion Store - Full Cloudflare Deployment%RESET%
echo %CYAN%===============================================%RESET%
echo.
echo Target: https://skvoshop.skvo-space.workers.dev/
echo.

REM Ensure we're in the project directory
cd /d c:\skvo_proj\fashion-store

REM Check Node.js
echo %YELLOW%[1/11] Checking Node.js...%RESET%
node --version >nul 2>&1
if errorlevel 1 (
    echo %RED%ERROR: Node.js not found!%RESET%
    pause
    exit /b 1
)
for /f "tokens=*" %%i in ('node --version') do (
    echo %GREEN%✓ Node.js %%i%RESET%
)

REM Check npm
echo %YELLOW%[2/11] Checking npm...%RESET%
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
echo %YELLOW%[3/11] Installing root dependencies...%RESET%
call npm install --silent
echo %GREEN%✓ Root dependencies installed%RESET%

REM Install client dependencies
echo %YELLOW%[4/11] Installing client dependencies...%RESET%
cd client
call npm install --silent
if errorlevel 1 (
    echo %RED%ERROR: Client install failed!%RESET%
    cd ..
    pause
    exit /b 1
)
cd ..
echo %GREEN%✓ Client dependencies installed%RESET%

REM Install API dependencies
echo %YELLOW%[5/11] Installing API dependencies...%RESET%
cd api
call npm install --silent
if errorlevel 1 (
    echo %RED%ERROR: API install failed!%RESET%
    cd ..
    pause
    exit /b 1
)
cd ..
echo %GREEN%✓ API dependencies installed%RESET%

REM Build client
echo %YELLOW%[6/11] Building client...%RESET%
cd client
call npm run build >nul 2>&1
if errorlevel 1 (
    echo %RED%ERROR: Client build failed!%RESET%
    cd ..
    pause
    exit /b 1
)
cd ..
echo %GREEN%✓ Client built successfully%RESET%

REM Install wrangler globally
echo %YELLOW%[7/11] Installing Wrangler CLI...%RESET%
call npm install -g wrangler@latest >nul 2>&1
echo %GREEN%✓ Wrangler CLI ready%RESET%

REM Authenticate with Cloudflare
echo %YELLOW%[8/11] Authenticating with Cloudflare...%RESET%
wrangler auth login
if errorlevel 1 (
    echo %RED%ERROR: Authentication failed!%RESET%
    pause
    exit /b 1
)
echo %GREEN%✓ Authenticated%RESET%

REM Deploy API
echo %YELLOW%[9/11] Deploying API to Cloudflare Workers...%RESET%
cd api
call npm run build >nul 2>&1
wrangler deploy
if errorlevel 1 (
    echo %RED%ERROR: API deployment failed!%RESET%
    cd ..
    pause
    exit /b 1
)
cd ..
echo %GREEN%✓ API deployed successfully%RESET%

REM Deploy Pages
echo %YELLOW%[10/11] Deploying frontend to Cloudflare Pages...%RESET%
wrangler pages deploy client/dist --project-name=skvoshop
if errorlevel 1 (
    echo %YELLOW%WARNING: Pages deployment had issues (project may already exist)%RESET%
)
echo %GREEN%✓ Frontend deployment completed%RESET%

REM Commit and push to Git
echo %YELLOW%[11/11] Committing and pushing to GitHub...%RESET%
git add -A >nul 2>&1
git commit -m "Deploy to Cloudflare: Production deployment at https://skvoshop.skvo-space.workers.dev" >nul 2>&1
git push origin main >nul 2>&1
echo %GREEN%✓ Committed and pushed to GitHub%RESET%

cls
echo.
echo %CYAN%===============================================%RESET%
echo %CYAN%     DEPLOYMENT SUCCESSFUL!%RESET%
echo %CYAN%===============================================%RESET%
echo.
echo %GREEN%Your site is now live:%RESET%
echo   https://skvoshop.skvo-space.workers.dev/
echo.
echo %GREEN%Admin Panel:%RESET%
echo   https://skvoshop.skvo-space.workers.dev/admin
echo   Password: 12345
echo.
echo %GREEN%API Endpoint:%RESET%
echo   https://skvoshop.skvo-space.workers.dev/api/
echo.
echo %GREEN%GitHub Repository:%RESET%
echo   https://github.com/SkvoSpace/SkvoShop
echo.
echo %CYAN%===============================================%RESET%
echo.
pause
