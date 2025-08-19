import { Collection } from "@/components/Collection/Collection";
import { Container } from "@mui/material";
import styles from './page.module.scss'
import { Collection as CollectionType, Product, Variant } from "@/app/actions";
import { db } from "@/utils/db";
import { collection } from "@/utils/schema/collection-schema";
import { product } from "@/utils/schema/product-schema";
import { eq } from "drizzle-orm";
import { variant } from "@/utils/schema/variant-schems";

export default async function CollectionPage() {
    const res = await db
        .select()
        .from(collection)
        .leftJoin(product, eq(collection.id, product.collectionId))
        .all()

    const variants = await db.select().from(variant)


    const collections = res
        .reduce<Array<CollectionType & { products: Array<Product & Variant> }>>((acc, { collection, product }) => {
            const index = acc.findIndex(e => e.id === collection.id)
            const variant = variants.find(v => v.productId === product!.id)!

            if (index !== -1 && product) {
                acc[index].products.push({ ...product, ...variant })
            } else {
                acc.push({
                    ...collection,
                    products: product ? [{ ...product, ...variant }] : []
                })
            }
            return acc
        }, [])

    return (
        <Container className={styles.container}>
            {
                collections.map(collection => <Collection key={collection.id} {...collection} />)
            }
        </Container>
    )
}
