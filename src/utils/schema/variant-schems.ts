import { sqliteTable, text, integer, int } from "drizzle-orm/sqlite-core";
import { collection } from "./collection-schema";
import { product } from "./product-schema";

export const variant = sqliteTable("product", {
    id: int().primaryKey({ autoIncrement: true }),
    variant: text('').notNull(),
    productId: int("product_id").references(() => product.id),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
})