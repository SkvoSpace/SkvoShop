import { Hono } from 'hono'
import { eq } from 'drizzle-orm'
import { getDB } from '../db'

export const createProductRoutes = (app: Hono) => {
  // GET all products
  app.get('/products', async (c) => {
    try {
      const db = getDB(c.env)
      const featured = c.req.query('featured')
      const category = c.req.query('category')

      let query = db.select().from(db.products)

      if (featured === 'true') {
        query = db.select().from(db.products).where(eq(db.products.featured, true))
      } else if (category && category !== 'all') {
        query = db.select().from(db.products).where(eq(db.products.category, category))
      }

      const products = await query
      return c.json({ data: products })
    } catch (error) {
      return c.json({ error: 'Failed to fetch products' }, 500)
    }
  })

  // GET single product
  app.get('/products/:id', async (c) => {
    try {
      const db = getDB(c.env)
      const id = parseInt(c.req.param('id'))
      const product = await db.select().from(db.products).where(eq(db.products.id, id))
      return c.json({ data: product[0] })
    } catch (error) {
      return c.json({ error: 'Product not found' }, 404)
    }
  })

  // POST create product
  app.post('/products', async (c) => {
    try {
      const db = getDB(c.env)
      const body = await c.req.json()
      const result = await db.insert(db.products).values(body).returning()
      return c.json({ data: result[0] }, 201)
    } catch (error) {
      return c.json({ error: 'Failed to create product' }, 400)
    }
  })

  // PUT update product
  app.put('/products/:id', async (c) => {
    try {
      const db = getDB(c.env)
      const id = parseInt(c.req.param('id'))
      const body = await c.req.json()
      const result = await db.update(db.products).set(body).where(eq(db.products.id, id)).returning()
      return c.json({ data: result[0] })
    } catch (error) {
      return c.json({ error: 'Failed to update product' }, 400)
    }
  })

  // DELETE product
  app.delete('/products/:id', async (c) => {
    try {
      const db = getDB(c.env)
      const id = parseInt(c.req.param('id'))
      await db.delete(db.products).where(eq(db.products.id, id))
      return c.json({ data: { success: true } })
    } catch (error) {
      return c.json({ error: 'Failed to delete product' }, 500)
    }
  })
}
