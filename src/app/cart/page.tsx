'use client'

import { decreaseQuantity, increaseQuantity, selectCart } from "@/store/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Box, Button, Container, IconButton } from "@mui/material"
import styles from './page.module.scss'
import { useState } from "react"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { redirect } from "next/navigation"
import { QuantitySelector } from "@/components/QantitySelector/QuantitySelector"
import { EmptyCart } from "./EmptyCart"
import Link from "next/link"
export default function CartPage() {
    const dispatch = useAppDispatch()
    const { products } = useAppSelector(selectCart)
    const [code, setCode] = useState<string>('')

    return (
        <Container className="flex flex-col relative size-dvh">
            <Box className={styles.pageHeader}>
                <IconButton onClick={() => redirect('/shop')} className={styles.pageArrowButton}>
                    <ArrowBackIcon color="inherit" />
                </IconButton>
                <h1>Cart</h1>
            </Box>
            {
                products.length === 0
                    ? <EmptyCart />
                    : <>
                        <Box className={styles.productListContainer}>
                            {products.map(product => {
                                return (
                                    <Box className={styles.productContainer} key={product.id}>
                                        <Box className={styles.productWrapper}>
                                            <Box className={styles.productImg} sx={{ backgroundImage: `url(${product.imageUrl})` }} />
                                            <p>{product.productName}</p>
                                        </Box>
                                        <QuantitySelector
                                            quantity={product.quantity}
                                            increase={() => dispatch(increaseQuantity(product))}
                                            decrease={() => dispatch(decreaseQuantity(product))}
                                        />
                                    </Box>
                                )
                            })}
                        </Box>
                        <input className={styles.inputCode} value={code} onChange={e => setCode(e.target.value)} placeholder="Promo code" />
                        <Button className={styles.applyCodeButton}>Apply</Button>
                        <Box className={styles.bottomPart}>
                            <Box className={styles.subtotal}>
                                <p>Subtotal</p>
                                <p>{products.reduce((acc, pr) => acc += pr.price * pr.quantity, 0)}</p>
                            </Box>
                            <Link className={styles.checkoutButton} href={'/cart/checkout'}>Go to checkout</Link>
                        </Box>
                    </>
            }
        </Container>
    )
}