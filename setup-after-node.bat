@echo off
REM Fashion Store - Quick Setup After Node Installation
REM Run this AFTER restarting PowerShell

setlocal EnableDelayedExpansion

color 0A
cls
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║   FASHION STORE - SETUP AFTER NODE INSTALLATION          ║
echo ║   Target: https://skvoshop.skvo-space.workers.dev/       ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Check Node
echo [1/8] Checking Node.js and npm...
node --version >nul 2>&1
if errorlevel 1 (
    color 0C
    echo ERROR: Node.js not found!
    echo SOLUTION: Restart your PowerShell/CMD window and try again
    pause
    exit /b 1
)

echo Node version:
node --version
echo npm version:
npm --version

REM Go to project
cd /d c:\skvo_proj\fashion-store

REM Install dependencies
echo.
echo [2/8] Installing root dependencies...
call npm install

echo.
echo [3/8] Installing client dependencies...
cd client
call npm install

echo.
echo [4/8] Building client...
call npm run build
cd ..

echo.
echo [5/8] Installing API dependencies...
cd api
call npm install
cd ..

echo.
echo [6/8] Installing Wrangler globally...
call npm install -g wrangler

echo.
echo [7/8] Testing Wrangler installation...
wrangler --version

REM Instructions
echo.
color 0B
echo ╔════════════════════════════════════════════════════════════╗
echo ║                    SETUP COMPLETE!                        ║
echo ╚════════════════════════════════════════════════════════════╝
echo.
echo NEXT STEPS:
echo -----------
echo 1. Authenticate: wrangler auth login
echo 2. Create D1:    cd api ^& wrangler d1 create fashion-db
echo 3. Migrations:   wrangler d1 execute fashion-db --file=./migrations/0001_initial.sql
echo 4. Deploy API:   wrangler deploy
echo 5. Deploy Pages: cd .. ^& wrangler pages deploy client/dist --project-name=skvoshop
echo.
echo OR follow the complete guide: CHECKLIST.md
echo.
color 0A
pause
