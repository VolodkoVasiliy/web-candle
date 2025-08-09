'use client'

import { Box, Button, Container, Divider, Link } from "@mui/material";
import styles from './page.module.scss'
import { useEffect, useMemo, useState } from "react";
import clsx from 'clsx'
import { Collection as CollectionType, getCollectionsWithProducts, Product } from "@/app/actions";
import { Loading } from "@/components/Loader/Loading";

export default function ShopPage() {
    const [filter, setFilter] = useState<string>('All')
    const [collections, setCollections] = useState<Array<CollectionType & { products: Product[] }>>([])
    const [filterList, setFilterList] = useState<string[]>([])

    const filterdProducts = useMemo(() => {
        if (filter === 'All') {
            return collections.reduce<Product[]>((acc, col) => [...acc, ...col.products], [])
        }

        return collections.find(col => col.collectionName === filter)?.products || []
    }, [filter, collections])

    useEffect(() => {
        getCollectionsWithProducts()
            .then(data => {
                setCollections(data)
                setFilterList(['All', ...data.map(d => d.collectionName)])
            })

    }, [])

    if (collections.length === 0) {
        return <Loading />
    }

    return (
        <Container className={styles.container}>
            <Box className={styles.filtersContainer}>
                {
                    filterList.map(f => {
                        return (
                            <Button
                                className={clsx(styles.filterButton, {
                                    [styles.active]: filter === f
                                })}
                                key={f}
                                onClick={() => setFilter(f)}
                            >
                                {f}
                            </Button>
                        )
                    })
                }
            </Box>
            <Divider flexItem variant="fullWidth" className={styles.divider} />
            <Box className={styles.productList}>
                {filterdProducts.map(el => {
                    return <Link className={styles.product} key={el.id} href={`/product/${el.id}`}>
                        <Box className={styles.productImg} sx={{ backgroundImage: `url(${el.imageUrl})` }} />
                        <Box className={styles.titleWrapper}>
                            <p className={styles.productTitle}>{el.productName}</p>
                            {/* <p className={styles.productSubtitle}>{el.subtitle}</p> */}
                            <p className={styles.productPrice}>{el.price} zl</p>
                        </Box>
                    </Link>
                })}
            </Box>
        </Container>
    )
}