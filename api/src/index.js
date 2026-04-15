import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { createProductRoutes } from './routes/products';
import { createContentRoutes } from './routes/content';
import { createAdminRoutes } from './routes/admin';
import { authMiddleware } from './middleware/auth';
const app = new Hono();
// Middleware
app.use('*', cors());
// Routes
const api = new Hono();
createProductRoutes(api);
createContentRoutes(api);
createAdminRoutes(api);
// Protected routes
const protectedApi = new Hono();
protectedApi.use('*', authMiddleware());
createProductRoutes(protectedApi);
createContentRoutes(protectedApi);
app.route('/api', api);
app.route('/api/admin', protectedApi);
// Health check
app.get('/', (c) => {
    return c.json({ message: 'Fashion Store API Running' });
});
export default app;
//# sourceMappingURL=index.js.map