'use client'

import { decreaseQuantity, increaseQuantity, selectCart } from "@/store/cart/cartSlice"
import { useAppDispatch, useAppSelector } from "@/store/hooks"
import { Box, Button, Container, IconButton } from "@mui/material"
import styles from './page.module.scss'
import { useState } from "react"
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useRouter } from "next/navigation"

export default function CartPage() {
    const dispatch = useAppDispatch()
    const { products } = useAppSelector(selectCart)
    const [code, setCode] = useState<string>('')
    const router = useRouter();

    return (
        <Container className="flex flex-col relative size-dvh">
            <Box className={styles.pageHeader}>
                <IconButton onClick={() => router.back()} className={styles.pageArrowButton}>
                    <ArrowBackIcon color="inherit" />
                </IconButton>
                <h1>Cart</h1>
            </Box>
            <Box className={styles.productListContainer}>
                {products.map(product => {
                    return (
                        <Box className={styles.productContainer} key={product.id}>
                            <Box className={styles.productWrapper}>
                                <Box className={styles.productImg} sx={{ backgroundImage: `url(${product.imgUrl})` }} />
                                <p>{product.title}</p>
                            </Box>
                            <Box className={styles.quantitySelector}>
                                <Button onClick={() => dispatch(decreaseQuantity(product))} className={styles.remove}>-</Button>
                                <p>{product.quantity}</p>
                                <Button onClick={() => dispatch(increaseQuantity(product))} className={styles.add}>+</Button>
                            </Box>
                        </Box>
                    )
                })}
            </Box>
            <input className={styles.inputCode} value={code} onChange={e => setCode(e.target.value)} placeholder="Promo code" />
            <Button className={styles.applyCodeButton}>Apply</Button>
            <Box className={styles.bottomPart}>
                <Box className={styles.subtotal}>
                    <p>Subtotal</p>
                    <p>{products.reduce((acc, pr) => acc += pr.price.value * pr.quantity, 0)}</p>
                </Box>
                <Button className={styles.checkoutButton}>Checout</Button>
            </Box>
        </Container>
    )
}