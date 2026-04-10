import { eq } from 'drizzle-orm';
import { getDB } from '../db';
import { products } from '../db/schema';
export const createProductRoutes = (app) => {
    // GET all products
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
    // POST create product
    app.post('/products', async (c) => {
        try {
            const db = getDB(c.env);
            const body = await c.req.json();
            const result = await db.insert(products).values(body).returning();
            return c.json({ data: result[0] }, 201);
        }
        catch (error) {
            return c.json({ error: 'Failed to create product' }, 400);
        }
    });
    // PUT update product
    app.put('/products/:id', async (c) => {
        try {
            const db = getDB(c.env);
            const id = parseInt(c.req.param('id'));
            const body = await c.req.json();
            const result = await db.update(products).set(body).where(eq(products.id, id)).returning();
            return c.json({ data: result[0] });
        }
        catch (error) {
            return c.json({ error: 'Failed to update product' }, 400);
        }
    });
    // DELETE product
    app.delete('/products/:id', async (c) => {
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