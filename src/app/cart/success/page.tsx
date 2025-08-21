import { Box, Container, IconButton } from '@mui/material'
import styles from './page.module.scss'
import { redirect } from 'next/navigation'
import { stripe } from '@/utils/stripe'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Link from 'next/link';
import { Resend } from 'resend';
import { ConfirmationLetter, InnerLightRecieptMail } from './ConfirmationLetter/ConfirmationLetter';

const resend = new Resend(process.env.RESEND_API_KEY);

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

    console.log(res)
    console.log(res.line_items?.data)
    const { orderId, name, addres } = res.metadata!
    const lineItems = res.line_items!.data
    resend.emails.send({
        from: 'Inner Light <inner.light.wroclaw@inner-light.pl>',
        to: [res.customer_details!.email!],
        subject: 'Order confirmation from Inner Light',
        react: InnerLightRecieptMail({
            orderId,
            name,
            address: addres,
            items: lineItems.map(l => ({
                imageUrl: l.price?.metadata.imageUrl as string,
                price: String(l.price?.unit_amount! / 100),
                title: l.description!
            }))
        }),
        replyTo: 'onboarding@resend.dev',
    }, {
        // idempotencyKey: `ored-id-${res.metadata?.orderId}`
    });

    resend.emails.send({
        from: 'Inner Light <inner.light.wroclaw@inner-light.pl>',
        to: ['inner.light.wroclaw@gmail.com'],
        subject: 'Новый заказ',
        react: ConfirmationLetter({ orderId: res.metadata!.orderId!, lineItems: res.line_items!.data }),
        replyTo: 'onboarding@resend.dev',
    }, {
        idempotencyKey: `ored-id-${res.metadata?.orderId}-host`
    });

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