import { sqliteTable, text, integer, int } from "drizzle-orm/sqlite-core";
import { product } from "./product-schema";

export const variant = sqliteTable("variant", {
    id: int().primaryKey({ autoIncrement: true }),
    title: text().notNull(),
    price: integer('price').notNull(),
    priceId: text('price_id').notNull(),
    size: text('size').notNull(),
    burnTime: text("burn_time").notNull(),
    productId: int("product_id").references(() => product.id)
})