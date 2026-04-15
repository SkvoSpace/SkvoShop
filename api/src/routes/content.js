import { eq } from 'drizzle-orm';
import { getDB } from '../db';
import { siteContent } from '../db/schema';
import { authMiddleware } from '../middleware/auth';
export const createContentRoutes = (app) => {
    // GET all content
    app.get('/content', async (c) => {
        try {
            const db = getDB(c.env);
            const content = await db.select().from(siteContent);
            return c.json({ data: content });
        }
        catch (error) {
            return c.json({ error: 'Failed to fetch content' }, 500);
        }
    });
    // GET single content
    app.get('/content/:key', async (c) => {
        try {
            const db = getDB(c.env);
            const key = c.req.param('key');
            const content = await db.select().from(siteContent).where(eq(siteContent.key, key));
            return c.json({ data: content[0] });
        }
        catch (error) {
            return c.json({ error: 'Content not found' }, 404);
        }
    });
    // PUT update content (protected)
    app.put('/content/:key', authMiddleware(), async (c) => {
        try {
            const db = getDB(c.env);
            const key = c.req.param('key');
            const body = await c.req.json();
            const result = await db.update(siteContent).set({ value: body.value }).where(eq(siteContent.key, key)).returning();
            return c.json({ data: result[0] });
        }
        catch (error) {
            return c.json({ error: 'Failed to update content' }, 400);
        }
    });
};
//# sourceMappingURL=content.js.map