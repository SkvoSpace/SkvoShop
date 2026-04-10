# 🧪 Testing Your Deployment

## API Endpoints

After deployment, your API will be available at:

```
https://skvoshop.skvo-space.workers.dev/api/
```

---

## Test Commands

### Using PowerShell

#### Get All Products
```powershell
$response = Invoke-WebRequest -Uri "https://skvoshop.skvo-space.workers.dev/api/products" -Method GET
$response.Content | ConvertFrom-Json | Format-Table
```

#### Get Featured Products
```powershell
$response = Invoke-WebRequest -Uri "https://skvoshop.skvo-space.workers.dev/api/products?featured=true" -Method GET
$response.Content | ConvertFrom-Json | Format-Table
```

#### Get Product by Category
```powershell
$response = Invoke-WebRequest -Uri "https://skvoshop.skvo-space.workers.dev/api/products?category=clothes" -Method GET
$response.Content | ConvertFrom-Json | Format-Table
```

#### Get Single Product
```powershell
$response = Invoke-WebRequest -Uri "https://skvoshop.skvo-space.workers.dev/api/products/1" -Method GET
$response.Content | ConvertFrom-Json | Format-Table
```

#### Create Product
```powershell
$body = @{
    name = "Test Product"
    description = "A test product"
    price = 9999
    image = "https://via.placeholder.com/300x300"
    category = "clothes"
    featured = $true
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://skvoshop.skvo-space.workers.dev/api/products" `
    -Method POST `
    -Body $body `
    -ContentType "application/json"
```

#### Update Product
```powershell
$body = @{
    name = "Updated Product"
    price = 15000
} | ConvertTo-Json

Invoke-WebRequest -Uri "https://skvoshop.skvo-space.workers.dev/api/products/1" `
    -Method PUT `
    -Body $body `
    -ContentType "application/json"
```

#### Delete Product
```powershell
Invoke-WebRequest -Uri "https://skvoshop.skvo-space.workers.dev/api/products/1" `
    -Method DELETE
```

---

## Using cURL (if available)

```bash
# Get all products
curl https://skvoshop.skvo-space.workers.dev/api/products

# Create product
curl -X POST https://skvoshop.skvo-space.workers.dev/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name":"New Product",
    "description":"A cool product",
    "price":5000,
    "category":"shoes",
    "featured":true
  }'

# Update product
curl -X PUT https://skvoshop.skvo-space.workers.dev/api/products/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Updated"}'

# Delete product
curl -X DELETE https://skvoshop.skvo-space.workers.dev/api/products/1
```

---

## Using Browser

### View API Response
Simply open in your browser:
```
https://skvoshop.skvo-space.workers.dev/api/products
https://skvoshop.skvo-space.workers.dev/api/products?featured=true
https://skvoshop.skvo-space.workers.dev/api/products/1
```

### Test Frontend
```
https://skvoshop.skvo-space.workers.dev/
https://skvoshop.skvo-space.workers.dev/admin  (password: 12345)
```

---

## Expected Response Format

### Success Response
```json
{
  "data": {
    "id": 1,
    "name": "Stylish T-Shirt",
    "description": "Comfortable cotton t-shirt",
    "price": 2500,
    "image": "https://via.placeholder.com/300x300",
    "category": "clothes",
    "featured": true
  }
}
```

### List Response
```json
{
  "data": [
    {
      "id": 1,
      "name": "Stylish T-Shirt",
      ...
    },
    {
      "id": 2,
      "name": "Designer Jeans",
      ...
    }
  ]
}
```

### Error Response
```json
{
  "error": "Product not found"
}
```

---

## Troubleshooting

### ❌ "Failed to connect"
- Make sure you deployed the API: `cd api && wrangler deploy`
- Wait 30 seconds for deployment to complete

### ❌ "404 Not Found"
- Check the URL spelling
- Make sure endpoint exists (check routes in api/src/index.ts)

### ❌ "CORS error"
- This should not happen, CORS is enabled
- Try from same domain or use curl

### ❌ "No data returned"
- Database might be empty
- Check migrations ran: `wrangler d1 execute fashion-db --file=./migrations/0001_initial.sql`

---

## Performance Tips

1. **Products endpoint**: ~50ms response (D1 database)
2. **Cold start**: First request may take 1-2 seconds (Cloudflare Workers warming up)
3. **Caching**: Not enabled by default, can add cache headers

---

## Available Data

After running migrations, you'll have sample products:
- ✅ Stylish T-Shirt (₽2500)
- ✅ Designer Jeans (₽8500)
- ✅ Leather Jacket (₽15000)
- ✅ Sneakers (₽6500)
- ✅ Backpack (₽4200)

---

**API Live at**: https://skvoshop.skvo-space.workers.dev/api/  
**Dashboard**: https://dash.cloudflare.com
