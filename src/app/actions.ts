'use server'

import { db } from "@/utils/db"
import { collection } from "@/utils/schema/collection-schema"
import { product } from "@/utils/schema/product-schema";
import { createInsertSchema } from 'drizzle-zod';
import { put } from '@vercel/blob';
import { eq, getTableColumns } from 'drizzle-orm';
import { orderHeader, orderItem } from "@/utils/schema/order-schema";
import { stripe } from "@/utils/stripe";
import { headers } from "next/headers";
import { variant } from "@/utils/schema/variant-schems";

export async function getCollections() {
    return await db.select().from(collection);
}

export type Collection = typeof collection.$inferInsert;

const collectionInsertSchema = createInsertSchema(collection);


export async function addCollection(newCollection: Collection & { image: Blob }) {
    try {
        const blob = await put(newCollection.collectionName, newCollection.image, {
            access: 'public',
            addRandomSuffix: true,
            contentType: 'image/png'
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

export type Variant = typeof variant.$inferInsert;

const variantInsertSchema = createInsertSchema(variant);

export async function addProduct(newProduct: Product, image: Blob, variants: Omit<Variant, 'priceId'>[]) {
    try {
        const blob = await put(newProduct.productName, image, {
            access: 'public',
            addRandomSuffix: true
        });

        const parsed = productInsertSchema.parse({ ...newProduct, imageUrl: blob.url })
        const [{ productId, imageUrl }] = await db.insert(product).values({ ...parsed }).returning({ productId: product.id, imageUrl: product.imageUrl })

        const variantPromises = variants.map(async (v) => {
            const { id: priceId } = await stripe.prices.create({
                currency: 'pln',
                unit_amount: v.price,
                product_data: {
                    name: newProduct.productName,
                },
                metadata: {
                    imageUrl
                }
            });

            const parsed = variantInsertSchema.parse({ ...v, priceId, productId })

            await db.insert(variant).values({ ...parsed })
        })

        await Promise.all(variantPromises)

        return { success: true }

    } catch {
        throw new Error('smth went wrong')
    }

}

export async function getProductByCollectionId(id: number): Promise<Product[]> {
    const res = await db.select().from(product).where(eq(product.collectionId, id))
    return res
}

export async function getProductWithCollectionById(id: number): Promise<{ product: Omit<Product, 'createdAt' | 'updatedAt'>, collection: Collection }> {
    try {
        //eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { createdAt, updatedAt, ...rest } = getTableColumns(product)
        const res = await db.select({ product: { ...rest }, collection }).from(product).innerJoin(collection, eq(product.collectionId, collection.id)).where(eq(product.id, id))
        return res[0]
    } catch {
        throw new Error('product not found')
    }
}

export async function getCollectionsWithProducts() {
    const res = await db.select().from(collection).leftJoin(product, eq(collection.id, product.collectionId)).all()
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

export type OrderHeader = typeof orderHeader.$inferInsert;
export type OrderItem = typeof orderItem.$inferInsert;


const orderHeaderInsertSchema = createInsertSchema(orderHeader);
const orderItemInsertSchema = createInsertSchema(orderItem);


export async function placeOrder(
    newOrderHeader: OrderHeader,
    products: Array<{ product: Product; quantity: number; variant: Variant }>
) {
    const headersList = await headers()
    const origin = headersList.get('origin')

    const parsedHeader = orderHeaderInsertSchema.parse(newOrderHeader)
    const [{ orderId }] = await db
        .insert(orderHeader)
        .values(parsedHeader)
        .returning({ orderId: orderHeader.id })

    console.log(1)

    const orderItems: OrderItem[] = products.map(p => {
        return {
            order_id: orderId,
            product_id: p.product.id!,
            quantity: p.quantity
        }
    })
    const parsedItems = orderItems.map(i => orderItemInsertSchema.parse(i))

    await db.insert(orderItem).values(parsedItems).returning()

    const { url } = await stripe.checkout.sessions.create({
        line_items: products.map(p => ({
            price: p.variant.priceId!,
            quantity: p.quantity,
        })),
        mode: 'payment',
        metadata: {
            orderId,
            name: newOrderHeader.name,
            addres: newOrderHeader.address,
        },
        success_url: `${origin}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/?canceled=true`
    });

    return url
}
