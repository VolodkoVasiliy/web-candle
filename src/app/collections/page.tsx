'use client'
import { Collection } from "@/components/Collection/Collection";
import { Container } from "@mui/material";
import styles from './page.module.scss'
import { useEffect, useState } from "react";
import { Collection as CollectionType, getCollectionsWithProducts, Product } from "@/app/actions";
import { Loading } from "@/components/Loader/Loading";

export default function CollectionPage2() {
    const [collections, setCollections] = useState<Array<CollectionType & { products: Product[] }>>([])

    useEffect(() => {
        getCollectionsWithProducts()
            .then(data => setCollections(data))
    }, [])

    if (collections.length === 0) {
        return <Loading />
    }

    return (
        <Container className={styles.container}>
            {
                collections.map(collection => <Collection key={collection.id} {...collection} />)
            }
        </Container>
    )
}
