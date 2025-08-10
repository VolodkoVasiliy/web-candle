import { Button } from '@mui/material'
import styles from './page.module.scss'
import { redirect } from 'next/navigation'

export const PlaceOrder = () => {
    const startCheckout = async () => {
        const res = await fetch('/api/checkout_sessions', {
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
        <Button className={styles.checkoutButton} onClick={startCheckout}>Place Order</Button>
    )
}