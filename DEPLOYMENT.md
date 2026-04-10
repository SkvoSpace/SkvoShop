# 🎯 Manual Cloudflare Deployment Guide

## **FASTEST METHOD - Use Cloudflare Dashboard (No CLI needed!)**

### ✨ Step 1: Access Cloudflare Dashboard
```
1. Go to: https://dash.cloudflare.com
2. Sign in or sign up
3. Copy credentials from secret.txt if needed
```

---

## **📱 Deploy Pages (Frontend)**

### Step 1: Build Your Frontend Locally
```powershell
cd c:\skvo_proj\fashion-store\client
npm install
npm run build
# This creates: c:\skvo_proj\fashion-store\client\dist
```

### Step 2: Upload to Pages
1. Open https://dash.cloudflare.com
2. Click **Pages** (left sidebar)
3. Click **Upload assets** or **Create project**
4. Select folder: `c:\skvo_proj\fashion-store\client\dist`
5. **Deploy!**
6. Your temporary domain: `https://YOUR_PROJECT_NAME.pages.dev`

---

## **⚙️ Deploy Workers (API)**

### Step 1: Prepare API Code
The Workers environment needs your `index.ts` code. Cloudflare will automatically build it.

### Step 2: Upload to Workers
1. Open https://dash.cloudflare.com
2. Click **Workers** (left sidebar)
3. Click **Create service**
4. Name: `fashion-store-api`
5. **Create service**
6. In the editor, copy the code from `c:\skvo_proj\fashion-store\api\src\index.ts`
7. Paste it into the online editor
8. Click **Deploy**
9. Your Workers URL: `https://fashion-store-api.YOUR_SUBDOMAIN.workers.dev`

### Step 3: Create D1 Database
1. Still in Workers section
2. Click **D1** in left sidebar
3. Click **Create database**
4. Name: `fashion-db`
5. Create!
6. Click on your database
7. Go to **Console** tab
8. Paste contents of `c:\skvo_proj\fashion-store\api\migrations\0001_initial.sql`
9. **Execute**

---

## **🔗 Connect Frontend to Backend**

Edit `c:\skvo_proj\fashion-store\client\src\hooks\useApi.ts`:

Change:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787'
```

To:
```typescript
const API_URL = 'https://fashion-store-api.YOUR_SUBDOMAIN.workers.dev'
```

Then rebuild:
```powershell
cd c:\skvo_proj\fashion-store\client
npm run build
```

---

## **✅ Test Your Site**

1. Open `https://YOUR_PROJECT_NAME.pages.dev`
2. You should see your Fashion Store!
3. Try `/admin` (password: `12345`)

---

## **🎉 Your Temporary Domains**

After deployment, you'll have:

| URL | What It Is |
|-----|-----------|
| `https://fashion-store.pages.dev` | Your frontend |
| `https://fashion-store-api.workers.dev` | Your API |
| `https://fashion-store.pages.dev/admin` | Admin panel |

---

## **Optional: CLI Method (If Node.js is working)**

```powershell
# 1. Install Wrangler globally
npm install -g wrangler

# 2. Authenticate
wrangler auth login

# 3. Create D1 Database
cd c:\skvo_proj\fashion-store\api
wrangler d1 create fashion-db

# 4. Copy database_id to wrangler.toml

# 5. Run migrations
wrangler d1 execute fashion-db --file=./migrations/0001_initial.sql

# 6. Deploy API
wrangler deploy

# 7. Deploy Frontend
cd ..
wrangler pages deploy client/dist

# Done! 🎉
```

---

## **Troubleshooting**

❌ **Pages not loading?**
- Check that `dist/index.html` exists
- Make sure frontend build had no errors

❌ **API 404 errors?**
- Check Workers binding to D1 in `wrangler.toml`
- Verify database migrations ran successfully

❌ **Admin not working?**
- Password is case-sensitive: `12345`
- Make sure API is responding on `/api` routes

**Questions? Check CLOUDFLARE_DOMAINS.md or README.md** 📚
