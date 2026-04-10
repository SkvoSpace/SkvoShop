import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { createProductRoutes } from './routes/products'
import { createContentRoutes } from './routes/content'
import { createAdminRoutes } from './routes/admin'

const app = new Hono()

// Middleware
app.use('*', cors())

// Routes
const api = new Hono()
createProductRoutes(api)
createContentRoutes(api)
createAdminRoutes(api)

app.route('/api', api)

// Health check
app.get('/', (c) => {
  return c.json({ message: 'Fashion Store API Running' })
})

export default app
