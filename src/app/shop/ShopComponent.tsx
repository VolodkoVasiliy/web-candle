'use client'

import { Box, Button, Container, Divider } from "@mui/material";
import styles from './page.module.scss'
import { useMemo, useState } from "react";
import clsx from 'clsx'
import { Collection as CollectionType, Product } from "@/app/actions";
import { Loading } from "@/components/Loader/Loading";
import Link from "next/link";

export default function ShopComponent(
    { collections }:
        {
            collections: Array<CollectionType & {
                products: Array<Product & { price: number }>
            }>
        }) {
    const [filter, setFilter] = useState<string>('All')
    const filterList = ['All', ...collections.map(d => d.collectionName)]

    const filterdProducts = useMemo(() => {
        if (filter === 'All') {
            return collections.reduce<Array<Product & { price: number }>>((acc, col) => [...acc, ...col.products], [])
        }

        return collections.find(col => col.collectionName === filter)?.products || []
    }, [filter, collections])



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
                            <p className={styles.productPrice}>{Math.ceil(el.price / 100)} zl</p>
                        </Box>
                    </Link>
                })}
            </Box>
        </Container>
    )
}