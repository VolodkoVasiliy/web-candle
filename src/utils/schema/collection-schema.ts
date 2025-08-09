import { sqliteTable, text, integer, int } from "drizzle-orm/sqlite-core";

export const collection = sqliteTable("collection", {
    id: int().primaryKey({ autoIncrement: true }),
    collectionName: text("collection_name").notNull(),
    collectionDescription: text("collection_description"),
    imageUrl: text("image_url"),
    createdAt: integer("created_at", { mode: "timestamp" })
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
    updatedAt: integer("updated_at", { mode: "timestamp" })
        .$defaultFn(() => /* @__PURE__ */ new Date())
        .notNull(),
})