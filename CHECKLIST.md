# ✅ Deployment Checklist for skvoshop.skvo-space.workers.dev

## 🎯 Your Deployment Target
**URL**: `https://skvoshop.skvo-space.workers.dev/`

---

## 📋 Pre-Deployment Setup

- [ ] Download Node.js: https://nodejs.org/dist/v25.9.0/node-v25.9.0-x64.msi
- [ ] Install Node.js (default settings, then restart PowerShell)
- [ ] Verify: `node --version` (should show v25.9.0+)

---

## 🚀 Deployment Steps

### Phase 1: Local Setup
- [ ] Open PowerShell as Administrator
- [ ] Navigate: `cd c:\skvo_proj\fashion-store`
- [ ] Run: `npm install` (install root dependencies)
- [ ] Run: `cd client && npm install && npm run build && cd ..` (build frontend)
- [ ] Run: `cd api && npm install && cd ..` (install API deps)

### Phase 2: Cloudflare Authentication
- [ ] Run: `npm install -g wrangler` (install Wrangler CLI globally)
- [ ] Run: `wrangler auth login` (opens browser to authenticate)
- [ ] Select your Cloudflare account and authorize

### Phase 3: Database Setup (API)
- [ ] Run: `cd api`
- [ ] Run: `wrangler d1 create fashion-db`
- [ ] **COPY** the `database_id` from the output
- [ ] Open: `api/wrangler.toml`
- [ ] Replace this line:
  ```toml
  database_id = ""
  ```
  with your copied ID:
  ```toml
  database_id = "YOUR_COPIED_ID_HERE"
  ```
- [ ] Run migrations: `wrangler d1 execute fashion-db --file=./migrations/0001_initial.sql`

### Phase 4: Deploy API
- [ ] Still in `api/` directory
- [ ] Run: `npm run deploy` (or `wrangler deploy`)
- [ ] Wait for success message
- [ ] You'll get a URL like: `https://skvoshop.skvo-space.workers.dev/api`

### Phase 5: Deploy Frontend (Pages)
- [ ] Go back: `cd ..`
- [ ] Run: `wrangler pages deploy client/dist`
- [ ] Choose: Upload entire directory
- [ ] Project name: `skvoshop`
- [ ] Your site is now live! 🎉

---

## ✨ Result

After deployment, you'll have:

| Part | URL | Details |
|------|-----|---------|
| **Home** | https://skvoshop.skvo-space.workers.dev/ | Main page |
| **Shop** | https://skvoshop.skvo-space.workers.dev/shop | Products by category |
| **Gallery** | https://skvoshop.skvo-space.workers.dev/gallery | Image grid |
| **Admin** | https://skvoshop.skvo-space.workers.dev/admin | Control panel |
| **API** | https://skvoshop.skvo-space.workers.dev/api/* | Backend endpoints |

**Admin login**: password `12345`

---

## 🔧 Credentials (Already Configured)

```
Account ID:  597c1fefe43cf2f788fb8ef4e6eb1e57
Zone ID:     68317604c5ed80ba27381a079839c9fa
API Key:     cfk_tDhT5q9IksjvSonJHrWngP5MteycRNpx3q3j6hTw12bd1667
```

✅ All pre-filled in wrangler.toml

---

## ⚡ Quick Command Summary

```powershell
# Setup
npm install
cd client && npm install && npm run build && cd ..
cd api && npm install && cd ..

# Authenticate
npm install -g wrangler
wrangler auth login

# Deploy
cd api
wrangler d1 create fashion-db
# (Copy database_id to wrangler.toml)
wrangler d1 execute fashion-db --file=./migrations/0001_initial.sql
wrangler deploy

# Finish
cd ..
wrangler pages deploy client/dist
```

---

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| **"node not found"** | Download and install from nodejs.org, restart PowerShell |
| **"npm not found"** | Node.js not installed properly, reinstall |
| **Wrangler auth fails** | Make sure you have Cloudflare account at dash.cloudflare.com |
| **D1 database fails** | Check account_id in wrangler.toml matches: 597c1fefe43cf2f788fb8ef4e6eb1e57 |
| **Deploy fails** | Run `wrangler whoami` to verify auth, then try again |

---

## 📞 Support

- **Wrangler Docs**: https://developers.cloudflare.com/workers/wrangler/
- **D1 Docs**: https://developers.cloudflare.com/d1/
- **Pages Docs**: https://developers.cloudflare.com/pages/
- **Cloudflare Dashboard**: https://dash.cloudflare.com

---

**Status**: ✅ Ready to Deploy  
**Target**: https://skvoshop.skvo-space.workers.dev/  
**Time to Live**: ~10 minutes after Node.js installation

Good luck! 🚀
