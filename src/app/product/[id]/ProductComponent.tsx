'use client'

import { Box, Button, Container } from "@mui/material";
import styles from './page.module.scss'
import { Details } from "@/components/Details/Details";
import { addProductToCart, decreaseQuantity, increaseQuantity, selectCart } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProductCarousel } from "@/components/ProductCarousel/ProductCarousel";
import { QuantitySelector } from "@/components/QantitySelector/QuantitySelector";
import { Collection, Product, Variant } from "@/app/actions";
import { useState } from "react";
import clsx from "clsx";

export default function ProductComponent({
    productWithCollection,
    relatedProducts
}: {
    productWithCollection: {
        product: Omit<Product, 'createdAt' | 'updatedAt'>,
        collection: Collection,
        variants: Variant[]
    };
    relatedProducts: Array<Product & Variant>
}) {

    const { product, collection, variants } = productWithCollection
    const dispatch = useAppDispatch()
    const { products: cartProducts } = useAppSelector(selectCart)
    const [currentVariant, setCurrentVariant] = useState<Variant>(variants[0])

    const quantity = cartProducts.find(pr =>
        pr.product.id === product.id &&
        pr.variant.id === currentVariant.id
    )?.quantity || 0

    return (
        <Container className={styles.container}>
            <Box className={styles.img} sx={{ height: 218, backgroundImage: `url(${product.imageUrl})` }} />
            <Box className={styles.priceContainer}>
                <Button className={styles.priceButton}>{currentVariant.price / 100} zl</Button>
                {
                    quantity === 0
                        ?
                        <Button
                            className={styles.addButton}
                            onClick={() => dispatch(addProductToCart({ product, variant: currentVariant }))}
                        >
                            Add to Cart
                        </Button>
                        :
                        <QuantitySelector
                            quantity={quantity}
                            increase={() => dispatch(increaseQuantity({ product, variant: currentVariant }))}
                            decrease={() => dispatch(decreaseQuantity({ product, variant: currentVariant }))}
                        />
                }
            </Box>
            {
                variants.length > 1 &&
                <Box className={styles.optionsWraper}>
                    <p>Вариант</p>
                    <Box className={styles.optionsButonBox}>
                        {
                            variants.map(v => {
                                return (
                                    <Button
                                        key={v.id}
                                        className={clsx(styles.optionButton, {
                                            [styles.currentOptionButton]: currentVariant.id === v.id
                                        })}
                                        onClick={() => {
                                            setCurrentVariant(v)
                                        }}
                                    >
                                        {v.title}
                                    </Button>
                                )
                            })
                        }
                    </Box>
                </Box>
            }
            <p className={styles.productTitle}>{product.productName}</p>
            <p className={styles.productDescription}>{product.productDescription}</p>
            <p className={styles.details}>Details</p>
            <Details
                burnTime={currentVariant.burnTime}
                scent={product.scent}
                size={currentVariant.size}
                type={product.type}
                collectionName={collection.collectionName}
            />
            <p className={styles.relatedTitle}>Related Products</p>
            <ProductCarousel products={relatedProducts} />
        </Container>
    )
}