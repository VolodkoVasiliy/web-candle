import { sqliteTable, text, integer, int } from "drizzle-orm/sqlite-core";
import { product } from "./product-schema";

export const orderHeader = sqliteTable("order_header", {
    id: int().primaryKey({ autoIncrement: true }),
    name: text("name").notNull(),
    address: text("address").notNull(),
    totalPrice: int("total_price").notNull(),
    city: text("city").notNull(),
    phone: text("address").notNull(),
    zipCode: text("zip_code").notNull(),
    status: text({ enum: ['CREATED', 'PAYED', 'FULFILLED'] }).notNull().default('CREATED'),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
})

export const orderItem = sqliteTable("order_item", {
    id: int().primaryKey({ autoIncrement: true }),
    order_id: int("order_id").notNull().references(() => orderHeader.id),
    product_id: int("product_id").notNull().references(() => product.id),
    quantity: int().notNull().default(1),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
})