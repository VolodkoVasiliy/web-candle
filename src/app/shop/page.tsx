import { Collection, Product } from "@/app/actions";
import ShopComponent from "./ShopComponent";
import { db } from "@/utils/db";
import { collection } from "@/utils/schema/collection-schema";
import { product } from "@/utils/schema/product-schema";
import { eq } from "drizzle-orm";
import { variant } from "@/utils/schema/variant-schems";

export default async function ShopPage() {
    const res = await db
        .select()
        .from(collection)
        .leftJoin(product, eq(collection.id, product.collectionId))
        .all()

    const variants = await db.select().from(variant)
    const collections = res.reduce<Array<Collection & { products: Array<Product & { price: number }> }>>((acc, { collection, product }) => {
        const index = acc.findIndex(e => e.id === collection.id)
        const price = variants.find(v => v.productId === product?.id)?.price || 0
        if (index !== -1 && product) {
            acc[index].products.push({ ...product, price })
        } else {
            acc.push({
                ...collection,
                products: product ? [{ ...product, price }] : [],
            })
        }
        return acc
    }, [])

    return <ShopComponent collections={collections} />
}