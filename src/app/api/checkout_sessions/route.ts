import { NextResponse } from 'next/server'
import { headers } from 'next/headers'

import { stripe } from '@/utils/stripe'

export async function POST() {
    try {
        const headersList = await headers()
        const origin = headersList.get('origin')

        // Create Checkout Sessions from body params.
        const session = await stripe.checkout.sessions.create({
            line_items: [
                {
                    // Provide the exact Price ID (for example, price_1234) of the product you want to sell
                    price: 'price_1RtxZK8db0LpGY8tcCKwRlCi',
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${origin}/cart/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${origin}/?canceled=true`
        });

        return NextResponse.json({ url: session.url })
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: err.statusCode || 500 }
        )
    }

}