import { drizzle } from 'drizzle-orm/d1';
import * as schema from './schema';
export const getDB = (env) => {
    return drizzle(env.DB, { schema });
};
export * from './schema';
//# sourceMappingURL=index.js.map