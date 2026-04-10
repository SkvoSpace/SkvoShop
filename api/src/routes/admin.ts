import { Hono } from 'hono'

export const createAdminRoutes = (app: Hono) => {
  // Health check
  app.get('/health', (c) => {
    return c.json({ status: 'ok' })
  })

  // Stats
  app.get('/stats', async (c) => {
    return c.json({
      data: {
        totalProducts: 0,
        totalOrders: 0,
        revenue: 0
      }
    })
  })
}
