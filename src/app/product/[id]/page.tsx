'use client'

import { Box, Button, Container } from "@mui/material";
import { use, useEffect, useState } from "react";
import styles from './page.module.scss'
import { IItem, mockShopData } from "@/app/mocks/indes";
import { Details } from "@/components/Details/Details";
import { convertPrice } from "@/utils/utils";
import Link from "next/link";
import { addProductToCart } from "@/store/cart/cartSlice";
import { useAppDispatch } from "@/store/hooks";

export default function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params)
    const [product, setProduct] = useState<IItem | undefined>(undefined)
    const dispatch = useAppDispatch()

    useEffect(() => {
        setProduct(mockShopData.find(el => el.id === id))
        window.scrollTo(0, 0)
    }, [id])

    if (!product) {
        return <>Loading...</>
    }

    return (
        <Container>
            <Box className={styles.img} sx={{ height: 218, backgroundImage: `url(${product.imgUrl})` }} />
            <Box className={styles.priceContainer}>
                <Button className={styles.priceButton}>{convertPrice(product.price)}</Button>
                <Button className={styles.addButton} onClick={() => dispatch(addProductToCart(product))}>Add to Cart</Button>
                {/* <Chip size="medium" sx={{ color: '#171412', fontWeight: '800' }} label={convertPrice(product.price)} />
                <Chip color="warning" sx={{ color: '#171412', fontWeight: '800' }} label='Add to cart' /> */}
            </Box>
            <p className={styles.productTitle}>Serenity Candle</p>
            <p className={styles.productDescription}>Hand-poured soy wax candle with a blend of lavender and chamomile essential oils. Creates a calming and peaceful atmosphere.</p>
            <p className={styles.details}>Details</p>
            <Details {...product} />
            <p className={styles.relatedTitle}>Related Products</p>
            <Box className={styles.relatedWrapper}>
                <Box className={styles.relatedList}>
                    {
                        mockShopData.map(el => {
                            return (
                                <Link href={`/product/${el.id}`} key={el.id} className={styles.relatedProductContainer} >
                                    <Box className={styles.productImg} sx={{ backgroundImage: `url(${el.imgUrl})` }} />
                                    <p className={styles.relatedProductName}>{el.title}</p>
                                    <p className={styles.relatedProductPrice}>{convertPrice(el.price)}</p>
                                </Link>
                            )
                        })
                    }
                </Box>
            </Box>
        </Container>
    )
}