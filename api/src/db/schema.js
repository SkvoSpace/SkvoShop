import { text, real, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
export const products = sqliteTable('products', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    description: text('description'),
    price: real('price').notNull(),
    image: text('image'),
    category: text('category').notNull().default('misc'),
    featured: integer('featured', { mode: 'boolean' }).default(false)
});
export const siteContent = sqliteTable('site_content', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    key: text('key').notNull().unique(),
    value: text('value').notNull()
});
//# sourceMappingURL=schema.js.map