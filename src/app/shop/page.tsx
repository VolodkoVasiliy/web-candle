'use client'

import { Box, Button, Container, Divider, Link } from "@mui/material";
import { Collection, mockShopData } from "../mocks/indes";
import { convertPrice } from "@/utils/utils";
import styles from './page.module.scss'
import { useMemo, useState } from "react";
import clsx from 'clsx'

export default function ShopPage() {
    const [filter, setFilter] = useState<Collection | 'All'>('All')

    const filterList = ['All', ...Object.values(Collection)]

    const filterdProducts = useMemo(() => {
        if (filter === 'All') {
            return mockShopData
        }

        return mockShopData.filter(pr => pr.collection === filter)
    }, [filter])

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
                                onClick={() => setFilter(f as Collection | 'All')}
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
                        <Box className={styles.productImg} sx={{ backgroundImage: `url(${el.imgUrl})` }} />
                        <Box className={styles.titleWrapper}>
                            <p className={styles.productTitle}>{el.title}</p>
                            {/* <p className={styles.productSubtitle}>{el.subtitle}</p> */}
                            <p className={styles.productPrice}>{convertPrice(el.price)}</p>
                        </Box>
                    </Link>
                })}
            </Box>
        </Container>
    )
}