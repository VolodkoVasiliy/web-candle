import { Container } from "@mui/material"
import Link from "next/link"
import styles from './page.module.scss'

export const EmptyCart = () => {
    return (
        <Container className={styles.emptyCart}>
            <p>{`Your cart is empty :(`}</p>
            <Link href={'/shop'} className={styles.goShoppingBtn}>
                Start Shopping
            </Link>
        </Container>
    )
}