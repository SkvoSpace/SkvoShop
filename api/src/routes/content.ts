import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { getDB } from '../db'

export const createContentRoutes = (app: Hono) => {
  // GET all content
  app.get('/content', async (c) => {
    try {
      const db = getDB(c.env)
      const content = await db.select().from(db.siteContent)
      return c.json({ data: content })
    } catch (error) {
      return c.json({ error: 'Failed to fetch content' }, 500)
    }
  })

  // GET single content
  app.get('/content/:key', async (c) => {
    try {
      const db = getDB(c.env)
      const key = c.req.param('key')
      const content = await db.select().from(db.siteContent).where(eq(db.siteContent.key, key))
      return c.json({ data: content[0] })
    } catch (error) {
      return c.json({ error: 'Content not found' }, 404)
    }
  })

  // PUT update content
  app.put('/content/:key', async (c) => {
    try {
      const db = getDB(c.env)
      const key = c.req.param('key')
      const body = await c.req.json()
      const result = await db.update(db.siteContent).set({ value: body.value }).where(eq(db.siteContent.key, key)).returning()
      return c.json({ data: result[0] })
    } catch (error) {
      return c.json({ error: 'Failed to update content' }, 400)
    }
  })
}
