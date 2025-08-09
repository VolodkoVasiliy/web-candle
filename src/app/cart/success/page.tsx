import { Container } from '@mui/material'
import styles from './page.module.scss'
import { redirect } from 'next/navigation'
import { stripe } from '@/utils/stripe'

export default async function SuccessPage({
    searchParams,
}: {
    searchParams: Promise<{ session_id?: string | undefined }>
}) {
    const { session_id } = await searchParams

    if (!session_id)
        throw new Error('Please provide a valid session_id (`cs_test_...`)')

    const res = await stripe.checkout.sessions.retrieve(session_id, {
        expand: ['line_items', 'payment_intent']
    })

    console.log(res)

    if (res.status === 'open') {
        return redirect('/')
    }

    if (res.status === 'complete') {
        return (
            <Container className={styles.container}>
                <h1 className={styles.title}>Order Confirmation</h1>
                <p></p>
                <p></p>
                <p></p>
            </Container>
        )
    }
}