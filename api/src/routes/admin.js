export const createAdminRoutes = (app) => {
    // Health check
    app.get('/health', (c) => {
        return c.json({ status: 'ok' });
    });
    // Stats
    app.get('/stats', async (c) => {
        return c.json({
            data: {
                totalProducts: 0,
                totalOrders: 0,
                revenue: 0
            }
        });
    });
};
//# sourceMappingURL=admin.js.map