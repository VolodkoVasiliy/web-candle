import { Box, Container, IconButton } from '@mui/material'
import styles from './page.module.scss'
import { redirect } from 'next/navigation'
import { stripe } from '@/utils/stripe'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';

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

    if (res.status === 'open') {
        return redirect('/')
    }

    if (res.status === 'complete') {

        return (
            <Container className={styles.container}>
                <Box className={styles.pageHeader}>
                    <IconButton className={styles.pageArrowButton}>
                        <Link href={'/'}>
                            <ArrowBackIcon color="inherit" />
                        </Link>
                    </IconButton>
                    <h1>Order Confirmation</h1>
                </Box>
                <Box className={styles.confirmationBox}>
                    <p className={styles.title}>Thank you for your order!</p>
                    <p className={styles.text}>Your order has been placed and is being processed. You will receive an email to <strong>{res.customer_details?.email}</strong> with confirmation shortly.</p>
                </Box>
                <Link href={'/'} className={styles.btn}>Continue shopping</Link>
            </Container>
        )
    }
}