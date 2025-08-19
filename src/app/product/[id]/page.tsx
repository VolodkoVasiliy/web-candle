import { db } from "@/utils/db";
import { getTableColumns, eq } from "drizzle-orm";
import ProductComponent from "./ProductComponent";
import { product } from "@/utils/schema/product-schema";
import { collection } from "@/utils/schema/collection-schema";
import { redirect } from "next/navigation";
import { variant } from "@/utils/schema/variant-schems";
import { Collection, Product, Variant } from "@/app/actions";

export default async function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params

    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { createdAt, updatedAt, ...rest } = getTableColumns(product)

    let productWithCollection, relatedProducts

    try {
        productWithCollection = (await db
            .select({ product: { ...rest }, collection, variant })
            .from(product)
            .innerJoin(collection, eq(
                product.collectionId, collection.id)
            )
            .innerJoin(variant, eq(product.id, variant.productId))
            .where(
                eq(product.id, Number(id))
            )).reduce<{ product: Product, collection: Collection, variants: Variant[] }>((acc, p) => {
                return {
                    product: p.product,
                    collection: p.collection,
                    variants: acc.variants ? [...acc.variants, p.variant] : [p.variant]
                }
            }, {} as any)

        console.log(productWithCollection)

        relatedProducts = (await db
            .select({ product: { ...rest }, variant })
            .from(product)
            .innerJoin(variant, eq(product.id, variant.productId))
            .where(
                eq(product.collectionId, productWithCollection.product.collectionId!)
            )).map(pr => ({
                ...pr.product,
                ...pr.variant
            }))
    } catch {
        redirect('/shop')
    }

    return <ProductComponent productWithCollection={productWithCollection} relatedProducts={relatedProducts} />
}