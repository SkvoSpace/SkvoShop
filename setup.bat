@echo off
echo Setting up Fashion Store project...

REM Install root dependencies
echo Installing root dependencies...
npm install

REM Install client dependencies
echo Installing client dependencies...
cd client
npm install
cd ..

REM Install API dependencies
echo Installing API dependencies...
cd api
npm install
cd ..

REM Create D1 database
echo Creating D1 database...
cd api
npx wrangler auth login
npx wrangler d1 create fashion-db
echo Please copy the database_id from above and paste it into api/wrangler.toml
pause

REM Run migrations
echo Running database migrations...
npx wrangler d1 execute fashion-db --file=./migrations/0001_initial.sql

REM Build client
echo Building client...
cd ../client
npm run build
cd ..

REM Deploy API
echo Deploying API...
cd api
npx wrangler deploy
cd ..

REM Deploy Pages
echo Deploying Pages...
npx wrangler pages deploy client/dist --project-name=fashion-store-pages

echo Setup complete! Your fashion store is now live on Cloudflare.
pause