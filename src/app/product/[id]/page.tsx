'use client'

import { Box, Button, Container } from "@mui/material";
import { use, useEffect, useState } from "react";
import styles from './page.module.scss'
import { Details } from "@/components/Details/Details";
import { addProductToCart, decreaseQuantity, increaseQuantity, selectCart } from "@/store/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { ProductCarousel } from "@/components/ProductCarousel/ProductCarousel";
import { QuantitySelector } from "@/components/QantitySelector/QuantitySelector";
import { Collection, getProductByCollectionId, getProductWithCollectionById, Product } from "@/app/actions";
import { Loading } from "@/components/Loader/Loading";
import { redirect } from "next/navigation";

export default function ProductPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = use(params)
    const [product, setProduct] = useState<Product | undefined>(undefined)
    const [collection, setCollection] = useState<Collection | undefined>(undefined)
    const [relatedProducts, setRelatedProducts] = useState<Product[]>([])
    const dispatch = useAppDispatch()
    const { products: cartProducts } = useAppSelector(selectCart)
    const [isError, setIsError] = useState<boolean>(false)
    useEffect(() => {
        getProductWithCollectionById(Number(id))
            .then(data => {
                setProduct(data.product)
                setCollection(data.collection)
            }).catch(() => {
                setIsError(true)
            })
        window.scrollTo(0, 0)
    }, [id])

    useEffect(() => {
        if (!product) return
        getProductByCollectionId(product.collectionId!)
            .then(data => setRelatedProducts(data.filter(p => p.id !== product.id)))
    }, [product])

    if (isError) {
        redirect('/shop')
    }

    if (!product || !collection) {
        return <Loading />
    }

    const quantity = cartProducts.find(pr => pr.id === product.id)?.quantity || 0

    return (
        <Container className={styles.container}>
            <Box className={styles.img} sx={{ height: 218, backgroundImage: `url(${product.imageUrl})` }} />
            <Box className={styles.priceContainer}>
                <Button className={styles.priceButton}>{product.price} zl</Button>
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
            </Box>
            <p className={styles.productTitle}>{product.productName}</p>
            <p className={styles.productDescription}>{product.productDescription}</p>
            <p className={styles.details}>Details</p>
            <Details {...product} collectionName={collection.collectionName} />
            <p className={styles.relatedTitle}>Related Products</p>
            <ProductCarousel products={relatedProducts} />
        </Container>
    )
}