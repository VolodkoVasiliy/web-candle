import { sqliteTable, text, integer, int } from "drizzle-orm/sqlite-core";
import { collection } from "./collection-schema";

export const product = sqliteTable("product", {
    id: int().primaryKey({ autoIncrement: true }),
    productName: text("product_name").notNull(),
    productDescription: text("product_description"),
    type: text('type').notNull(),
    scent: text('scent').notNull(),
    imageUrl: text("image_url"),
    collectionId: int("collection_id").references(() => collection.id),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
})