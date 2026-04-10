export const authMiddleware = (password: string = '12345') => {
  return (c: any, next: any) => {
    const auth = c.req.header('Authorization')
    if (auth !== `Bearer ${password}`) {
      return c.json({ error: 'Unauthorized' }, 401)
    }
    return next()
  }
}
