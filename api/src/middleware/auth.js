export const authMiddleware = (password = '12345') => {
    return (c, next) => {
        const auth = c.req.header('Authorization');
        if (auth !== `Bearer ${password}`) {
            return c.json({ error: 'Unauthorized' }, 401);
        }
        return next();
    };
};
//# sourceMappingURL=auth.js.map