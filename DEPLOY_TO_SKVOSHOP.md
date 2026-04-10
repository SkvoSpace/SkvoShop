# 🚀 Deploy to skvoshop.skvo-space.workers.dev

## Your Deployment Target
```
🌐 https://skvoshop.skvo-space.workers.dev/
```

---

## ✅ Configuration Ready

Your project is now configured for deployment to:
- **Workers API**: `https://skvoshop.skvo-space.workers.dev/api/*`
- **Frontend**: `https://skvoshop.skvo-space.workers.dev/*`

### Pre-configured Values:
- ✅ Account ID: `597c1fefe43cf2f788fb8ef4e6eb1e57`
- ✅ Zone ID: `68317604c5ed80ba27381a079839c9fa`  
- ✅ API URL: Automatically set to `https://skvoshop.skvo-space.workers.dev`
- ✅ wrangler.toml updated
- ✅ Client API hook updated

---

## 🚀 Deploy Now

### Step 1: Install Node.js (if not already done)
- Download: https://nodejs.org/en/download/package-manager/current
- Or: https://nodejs.org/dist/v25.9.0/node-v25.9.0-x64.msi
- **Restart PowerShell after installation**

### Step 2: Verify Node.js
```powershell
node --version
npm --version
```

### Step 3: Install Dependencies
```powershell
cd c:\skvo_proj\fashion-store
npm install
```

### Step 4: Authenticate with Cloudflare
```powershell
npx wrangler auth login
# Browser opens - log in with your Cloudflare account
```

### Step 5: Create D1 Database
```powershell
cd api
npx wrangler d1 create fashion-db
```
Copy the `database_id` from output.

### Step 6: Update wrangler.toml
Edit `api/wrangler.toml` and replace the empty `database_id`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "fashion-db"
database_id = "YOUR_DATABASE_ID"  # ← Paste here
```

### Step 7: Run Migrations
```powershell
npx wrangler d1 execute fashion-db --file=./migrations/0001_initial.sql
```

### Step 8: Install Client & API Dependencies
```powershell
npm install

cd ../client
npm install

cd ../api
npm install

cd ..
```

### Step 9: Build Client
```powershell
cd client
npm run build
cd ..
```

### Step 10: Deploy API
```powershell
cd api
npm run deploy
# Or: npx wrangler deploy
```

### Step 11: Deploy Frontend
```powershell
cd ..
npx wrangler pages deploy client/dist --project-name=skvoshop
```

---

## ✨ Done!

Your site is now live at:
```
🌐 https://skvoshop.skvo-space.workers.dev/
```

### Test It:
- 🏠 Homepage: https://skvoshop.skvo-space.workers.dev/
- 🛍️ Shop: https://skvoshop.skvo-space.workers.dev/shop
- 🖼️ Gallery: https://skvoshop.skvo-space.workers.dev/gallery
- 🔐 Admin: https://skvoshop.skvo-space.workers.dev/admin (password: `12345`)

---

## 🐛 Troubleshooting

### ❌ Node.js still not found
1. Download: https://nodejs.org/dist/v25.9.0/node-v25.9.0-x64.msi
2. Run the installer (default options)
3. **Close and reopen PowerShell**
4. Try again: `node --version`

### ❌ Wrangler auth login fail
- Make sure you have Cloudflare account
- Use the global API token from secret.txt if needed

### ❌ D1 database creation issue
- Check account ID in wrangler.toml matches: `597c1fefe43cf2f788fb8ef4e6eb1e57`
- Make sure you're authenticated: `npx wrangler whoami`

### ❌ Deploy fails
- Check you're in the right directory: `cd c:\skvo_proj\fashion-store`
- Verify all dependencies installed: `npm install` (in each folder)

---

## 📊 API Endpoints

Once deployed, your API will respond at:
```
GET    https://skvoshop.skvo-space.workers.dev/api/products
POST   https://skvoshop.skvo-space.workers.dev/api/products
PUT    https://skvoshop.skvo-space.workers.dev/api/products/:id
DELETE https://skvoshop.skvo-space.workers.dev/api/products/:id
```

---

**Ready? Let's go! 🚀**
