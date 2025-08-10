'use client'
import { useEffect, useRef } from 'react'
import { Provider } from 'react-redux'
import { makeStore, AppStore } from '../store/store'
import { initializeCart } from '@/store/cart/cartSlice'

export default function StoreProvider({
    children,
}: {
    children: React.ReactNode
}) {
    const storeRef = useRef<AppStore>(undefined)
    if (!storeRef.current) {
        // Create the store instance the first time this renders
        storeRef.current = makeStore()
    }

    useEffect(() => {
        const cart = localStorage.getItem('cart')
        if (cart && storeRef.current) {
            storeRef.current.dispatch(initializeCart(JSON.parse(cart)))
        }
    }, [])

    return <Provider store={storeRef.current}>{children}</Provider>
}