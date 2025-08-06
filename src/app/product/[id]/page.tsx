'use client'

import { Box, Button, Container } from "@mui/material";
import { use, useEffect, useState } from "react";
import styles from './page.module.scss'
import { IItem, mockShopData } from "@/app/mocks/indes";
import { Details } from "@/components/Details/Details";
import { convertPrice } from "@/utils/utils";
import { addProductToCart, decreaseQuantity, increaseQuantity, selectCart } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProductCarousel } from "@/components/ProductCarousel/ProductCarousel";
import { QuantitySelector } from "@/components/QantitySelector/QuantitySelector";

export default function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params)
    const [product, setProduct] = useState<IItem | undefined>(undefined)
    const dispatch = useAppDispatch()
    const { products: cartProducts } = useAppSelector(selectCart)

    useEffect(() => {
        setProduct(mockShopData.find(el => el.id === id))
        window.scrollTo(0, 0)
    }, [id])

    if (!product) {
        return <>Loading...</>
    }

    const quantity = cartProducts.find(pr => pr.id === product.id)?.quantity || 0

    return (
        <Container className={styles.container}>
            <Box className={styles.img} sx={{ height: 218, backgroundImage: `url(${product.imgUrl})` }} />
            <Box className={styles.priceContainer}>
                <Button className={styles.priceButton}>{convertPrice(product.price)}</Button>
                {
                    quantity === 0
                        ?
                        <Button
                            className={styles.addButton}
                            onClick={() => dispatch(addProductToCart(product))}
                        >
                            Add to Cart
                        </Button>
                        :
                        <QuantitySelector
                            quantity={quantity}
                            increase={() => dispatch(increaseQuantity(product))}
                            decrease={() => dispatch(decreaseQuantity(product))}
                        />
                }
                {/* <Chip size="medium" sx={{ color: '#171412', fontWeight: '800' }} label={convertPrice(product.price)} />
                <Chip color="warning" sx={{ color: '#171412', fontWeight: '800' }} label='Add to cart' /> */}
            </Box>
            <p className={styles.productTitle}>Serenity Candle</p>
            <p className={styles.productDescription}>Hand-poured soy wax candle with a blend of lavender and chamomile essential oils. Creates a calming and peaceful atmosphere.</p>
            <p className={styles.details}>Details</p>
            <Details {...product} />
            <p className={styles.relatedTitle}>Related Products</p>
            <ProductCarousel products={mockShopData} />
        </Container>
    )
}