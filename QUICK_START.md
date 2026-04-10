# 🚀 Quick Start - 10 Minutes to Live

## Option A: Dashboard Upload (Easiest - 2 minutes)

### 1. Build Frontend
```powershell
cd c:\skvo_proj\fashion-store\client
npm install
npm run build
```

### 2. Open Cloudflare Dashboard
- Go to https://dash.cloudflare.com
- Click **Pages** 
- Click **Upload assets**
- Select folder: `client/dist`
- Get your `.pages.dev` URL ✅

---

## Option B: CLI Deploy (Professional - 5 minutes)

### 1. Install & Authenticate
```powershell
npm install -g wrangler
wrangler auth login
```

### 2. Deploy Frontend
```powershell
cd c:\skvo_proj\fashion-store
npm install
cd client && npm install && npm run build
cd ..
wrangler pages deploy client/dist --project-name fashion-store
```

### 3. Deploy API
```powershell
cd api
npm install
wrangler d1 create fashion-db
# Copy database_id to api/wrangler.toml
wrangler d1 execute fashion-db --file=./migrations/0001_initial.sql
wrangler deploy
```

---

## 📊 Result

| Component | URL |
|-----------|-----|
| **Frontend** | `https://fashion-store.YOURNAME.pages.dev` |
| **API** | `https://fashion-store-api.YOURNAME.workers.dev` |
| **Admin** | `/admin` (password: 12345) |

---

## ⚡ Your Credentials (Already in wrangler.toml)
- Account ID: `597c1fefe43cf2f788fb8ef4e6eb1e57`
- Zone ID: `68317604c5ed80ba27381a079839c9fa`
- API Key: `cfk_tDhT5q9IksjvSonJHrWngP5MteycRNpx3q3j6hTw12bd1667`

**Done! Your fashion store is live!** 🎉
