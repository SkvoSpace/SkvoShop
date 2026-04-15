import { eq } from 'drizzle-orm';
import { getDB } from '../db';
import { products } from '../db/schema';
import { authMiddleware } from '../middleware/auth';
export const createProductRoutes = (app) => {
    // GET all products (public)
    app.get('/products', async (c) => {
        try {
            const db = getDB(c.env);
            const featured = c.req.query('featured');
            const category = c.req.query('category');
            const query = featured === 'true'
                ? db.select().from(products).where(eq(products.featured, true))
                : category && category !== 'all'
                    ? db.select().from(products).where(eq(products.category, category))
                    : db.select().from(products);
            const productsList = await query;
            return c.json({ data: productsList });
        }
        catch (error) {
            return c.json({ error: 'Failed to fetch products' }, 500);
        }
    });
    // GET single product
    app.get('/products/:id', async (c) => {
        try {
            const db = getDB(c.env);
            const id = parseInt(c.req.param('id'));
            const product = await db.select().from(products).where(eq(products.id, id));
            return c.json({ data: product[0] });
        }
        catch (error) {
            return c.json({ error: 'Product not found' }, 404);
        }
    });
    // POST create product (protected)
    app.post('/products', authMiddleware(), async (c) => {
        try {
            const db = getDB(c.env);
            const body = await c.req.json();
            // Basic validation
            if (!body.name || typeof body.name !== 'string' || body.name.trim() === '') {
                return c.json({ error: 'Name is required and must be a non-empty string' }, 400);
            }
            if (!body.price || typeof body.price !== 'number' || body.price <= 0) {
                return c.json({ error: 'Price is required and must be a positive number' }, 400);
            }
            if (!body.category || typeof body.category !== 'string') {
                return c.json({ error: 'Category is required and must be a string' }, 400);
            }
            const result = await db.insert(products).values(body).returning();
            return c.json({ data: result[0] }, 201);
        }
        catch (error) {
            return c.json({ error: 'Failed to create product' }, 400);
        }
    });
    // PUT update product (protected)
    app.put('/products/:id', authMiddleware(), async (c) => {
        try {
            const db = getDB(c.env);
            const id = parseInt(c.req.param('id'));
            const body = await c.req.json();
            // Basic validation
            if (body.name !== undefined && (typeof body.name !== 'string' || body.name.trim() === '')) {
                return c.json({ error: 'Name must be a non-empty string' }, 400);
            }
            if (body.price !== undefined && (typeof body.price !== 'number' || body.price <= 0)) {
                return c.json({ error: 'Price must be a positive number' }, 400);
            }
            if (body.category !== undefined && typeof body.category !== 'string') {
                return c.json({ error: 'Category must be a string' }, 400);
            }
            const result = await db.update(products).set(body).where(eq(products.id, id)).returning();
            return c.json({ data: result[0] });
        }
        catch (error) {
            return c.json({ error: 'Failed to update product' }, 400);
        }
    });
    // DELETE product (protected)
    app.delete('/products/:id', authMiddleware(), async (c) => {
        try {
            const db = getDB(c.env);
            const id = parseInt(c.req.param('id'));
            await db.delete(products).where(eq(products.id, id));
            return c.json({ data: { success: true } });
        }
        catch (error) {
            return c.json({ error: 'Failed to delete product' }, 500);
        }
    });
};
//# sourceMappingURL=products.js.map