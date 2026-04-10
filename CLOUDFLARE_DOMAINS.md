# 🌐 Setting Up Temporary Cloudflare Domains

## Your Cloudflare Credentials
- **Account ID**: 597c1fefe43cf2f788fb8ef4e6eb1e57
- **Zone ID**: 68317604c5ed80ba27381a079839c9fa
- **Global API Key**: cfk_tDhT5q9IksjvSonJHrWngP5MteycRNpx3q3j6hTw12bd1667

---

## 📱 **Option 1: Via Cloudflare Dashboard (Easiest)**

### Step 1: Go to Cloudflare Website
1. Open https://dash.cloudflare.com
2. Login with your credentials

### Step 2: Create Cloudflare Pages Project
1. Go to **Pages** in left sidebar
2. Click **Create project**
3. Select **Upload assets** (for static site)
4. Upload the contents of `client/dist` folder
5. **You'll get a `.pages.dev` URL** like:
   ```
   https://fashion-store-pages-1234.pages.dev
   ```

### Step 3: Deploy as Worker (API)
1. Go to **Workers** in left sidebar
2. Click **Create service**
3. Name it: `fashion-store-api`
4. Copy contents from `api/src/index.ts` into the editor
5. **You'll get a `.workers.dev` URL** like:
   ```
   https://fashion-store-api.your-username.workers.dev
   ```

---

## 🛠️ **Option 2: Via CLI (After Node.js Fix)**

### Step 1: Install Node.js Properly
```powershell
# Close all PowerShell windows
# Download from: https://nodejs.org/en/download/package-manager/current
# Or use: https://nodejs.org/dist/v25.9.0/node-v25.9.0-x64.msi

# After installation, **restart your PowerShell**
```

### Step 2: Navigate to Project
```bash
cd c:\skvo_proj\fashion-store
```

### Step 3: Global Wrangler Install
```bash
npm install -g wrangler@3
```

### Step 4: Authenticate
```bash
wrangler auth login
# Opens browser - login with your Cloudflare account
```

### Step 5: Create D1 Database
```bash
cd api
wrangler d1 create fashion-db
```

Copy the `database_id` from output and add to `api/wrangler.toml`:
```toml
[[d1_databases]]
binding = "DB"
database_name = "fashion-db"
database_id = "YOUR_DATABASE_ID_HERE"
```

### Step 6: Run Database Migrations
```bash
wrangler d1 execute fashion-db --file=./migrations/0001_initial.sql
```

### Step 7: Deploy API
```bash
wrangler deploy
# API deployed! URL: https://fashion-store-api.YOUR_SUBDOMAIN.workers.dev
```

### Step 8: Build & Deploy Pages
```bash
cd ../client
npm run build

cd ..
wrangler pages deploy client/dist --project-name=fashion-store
# Pages deployed! URL: https://fashion-store.YOUR_SUBDOMAIN.pages.dev
```

---

## ✅ **What You'll Get**

| Component | Temporary Domain | Type |
|-----------|-----------------|------|
| API/Backend | `https://fashion-store-api.*.workers.dev` | Workers |
| Frontend/UI | `https://fashion-store.*.pages.dev` | Pages |
| Admin Panel | `https://fashion-store.*.pages.dev/admin` | Pages |

---

## 🔐 **Admin Access**
- **URL**: `https://fashion-store.*.pages.dev/admin`
- **Password**: `12345`

---

## 📋 **Wrangler Configuration (Pre-filled)**

### api/wrangler.toml
```toml
name = "fashion-store-api"
main = "src/index.ts"
compatibility_date = "2024-01-01"
account_id = "597c1fefe43cf2f788fb8ef4e6eb1e57"

[build]
command = "npm run build"
cwd = "./"

[[d1_databases]]
binding = "DB"
database_name = "fashion-db"
database_id = ""  # ← Fill this after `wrangler d1 create`
```

---

## 🚀 **Quick Temporary Domain Links**

After deployment, your domain will look like:
- **Frontend**: `https://fashion-store-1a2b3c.pages.dev`
- **API**: `https://fashion-store-api.username.workers.dev`

These are **instantly available** and **free to use**.

---

## 🎯 **Next Steps**

1. **Restart PowerShell** after Node.js installation
2. Use **Option 1** (Dashboard) for quickest setup - **no CLI needed!**
3. Or follow **Option 2** (CLI) if Node.js works

Pick whichever is easier for you! 🎉
