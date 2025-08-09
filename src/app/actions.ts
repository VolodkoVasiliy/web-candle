'use server'

import { db } from "@/utils/db"
import { collection } from "@/utils/schema/collection-schema"
import { product } from "@/utils/schema/product-schema";
import { createInsertSchema } from 'drizzle-zod';
import { put } from '@vercel/blob';
import { eq } from 'drizzle-orm';

export async function getCollections() {
    return await db.select().from(collection);
}

export type Collection = typeof collection.$inferInsert;

const collectionInsertSchema = createInsertSchema(collection);


export async function addCollection(newCollection: Collection & { image: File }) {
    try {
        const blob = await put(newCollection.image.name, newCollection.image, {
            access: 'public',
            addRandomSuffix: true
        });

        const parsed = collectionInsertSchema.parse(newCollection)

        await db.insert(collection).values({ ...parsed, imageUrl: blob.url })
        return { success: true }

    } catch {
        return { success: false }
    }
}

export type Product = typeof product.$inferInsert;

const productInsertSchema = createInsertSchema(product);

export async function addProduct(newProduct: Product & { image: File }) {
    try {
        const blob = await put(newProduct.image.name, newProduct.image, {
            access: 'public',
            addRandomSuffix: true
        });

        const parsed = productInsertSchema.parse(newProduct)

        await db.insert(product).values({ ...parsed, imageUrl: blob.url })

        return { success: true }

    } catch {
        return { success: false }
    }

}

export async function getProductByCollectionId(id: number): Promise<Product[]> {
    const res = await db.select().from(product).where(eq(product.collectionId, id))
    return res
}

export async function getProductWithCollectionById(id: number): Promise<{ product: Product, collection: Collection }> {
    const res = await db.select().from(product).innerJoin(collection, eq(product.collectionId, collection.id)).where(eq(product.id, id))
    console.log(res)
    return res[0]
}

export async function getCollectionsWithProducts() {
    const res = await db.select().from(collection).leftJoin(product, eq(collection.id, product.collectionId)).all()
    console.log(res)
    return res.reduce<Array<Collection & { products: Product[] }>>((acc, { collection, product }) => {
        const index = acc.findIndex(e => e.id === collection.id)
        if (index !== -1 && product) {
            acc[index].products.push(product)
        } else {
            acc.push({
                ...collection,
                products: product ? [product] : []
            })
        }
        return acc
    }, [])
}

export async function getAllProducts(): Promise<Product[]> {
    return await db.select().from(product)
}

