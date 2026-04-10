# Fashion Store - Cloudflare Stack

Готовый шаблон fashion-магазина на **React 18** + **TypeScript** + **Tailwind CSS** + **Hono** + **Cloudflare D1**.

## 🚀 Quick Start

### 1. Setup

```bash
cd fashion-store
npm install
cd client && npm install
cd ../api && npm install
```

### 2. Create D1 Database

```bash
cd api
npx wrangler d1 create fashion-db
# Вставь database_id в wrangler.toml
```

### 3. Dev Mode

Терминал 1 - API:
```bash
cd api
npm run dev
```

Терминал 2 - Client:
```bash
cd client
npm run dev
```

## 📁 Structure

```
fashion-store/
├── client/              # React SPA (Vite)
│   ├── src/
│   │   ├── components/  # Components (Header, Footer, ProductCard, etc)
│   │   ├── pages/       # Pages (Home, Shop, Gallery, Admin)
│   │   ├── hooks/       # Custom hooks (useApi)
│   │   ├── types.ts     # TypeScript types + AppContext
│   │   └── App.tsx      # Main app with Router
│   └── vite.config.ts
│
└── api/                 # Hono API (Workers)
    ├── src/
    │   ├── db/         # Drizzle ORM + D1 schema
    │   ├── routes/     # API routes (products, content, admin)
    │   ├── middleware/ # Auth & other middleware
    │   └── index.ts    # Main Hono app
    └── wrangler.toml   # Cloudflare config
```

## 🛠️ Features

✅ **Admin Panel** (`/admin`, password: `12345`)
- Create/edit/delete products
- Manage site content

✅ **Shop Features**
- Product gallery (responsive grid)
- Category filter (clothes, accessories, shoes)
- Shopping cart (localStorage)
- Featured products highlight

✅ **Responsive Design**
- Mobile-first Tailwind CSS
- Hamburger menu on mobile
- Optimized for all screen sizes

✅ **API Endpoints**
```
GET    /api/products              # All products
GET    /api/products?featured=true # Featured only
GET    /api/products?category=xxx # By category
GET    /api/products/:id          # Single product
POST   /api/products              # Create product
PUT    /api/products/:id          # Update product
DELETE /api/products/:id          # Delete product

GET    /api/content               # Site content
PUT    /api/content/:key          # Update content
```

## 📤 Deploy to Cloudflare

```bash
# Deploy API
cd api
npm run deploy

# Deploy Client
cd ../client
npm run build
cp -r dist/* ../api/public/

# Or use Cloudflare Pages separately
```

## 🔐 Security Notes

- Admin password hardcoded (12345) - меняй в production!
- No real auth headers - добавь JWT в production
- CORS enabled for all - ограничь domains в production

## 📦 Dependencies

- **React 18** - UI
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **React Router v7** - Navigation
- **Hono** - API server
- **Drizzle ORM** - Database
- **TypeScript** - Type safety

## 🚀 Next Steps

1. ✅ Создай D1 database
2. ✅ Поставь зависимости (npm install everywhere)
3. ✅ Запусти dev серверы (npm run dev)
4. ✅ Заходи на http://localhost:5173
5. ✅ Добавь продукты через /admin с паролем 12345
6. ✅ Deploy на Cloudflare Pages + Workers

---

Made with ❤️ for Cloudflare 2026
