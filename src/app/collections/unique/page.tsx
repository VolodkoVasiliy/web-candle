'use client'

import { mockShopData } from "@/app/mocks/indes";
import { ShopCard } from "@/components/ShopCard/ShopCard";
import { addProductToCart } from "@/store/cart/cartSlice";
import { useAppDispatch } from "@/store/hooks";
import { Container } from "@mui/material";
import styles from './page.module.scss'

export default function UniquePage() {
    // const cart = useAppSelector(selectCart)
    const dispatch = useAppDispatch()


    return (
        <>
            <Container className={styles.container}>
                {
                    mockShopData.map(msd => <ShopCard key={msd.id} {...msd} onClick={() => dispatch(addProductToCart(msd))} />)
                }
            </Container>
        </>
    )
}