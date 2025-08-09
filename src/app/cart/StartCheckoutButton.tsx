import { Button } from '@mui/material'
import styles from './page.module.scss'
import { redirect } from 'next/navigation'

export const StartCheckoutButton = () => {
    const startCheckout = async () => {
        const res = await fetch('http://localhost:3000/api/checkout_sessions', {
            method: 'POST',
            body: JSON.stringify({
                product: 'candle',
                price: 2000
            })
        })
        const data = await res.json()
        redirect(data.url)
    }

    return (
        <Button className={styles.checkoutButton} onClick={startCheckout}>Checkout</Button>
    )
}