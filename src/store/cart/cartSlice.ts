import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { Product } from "@/app/actions";

export interface CartState {
    products: Array<Product & { quantity: number }>
}

const initialState: CartState = {
    products: []
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState: initialState,
    reducers: {
        initializeCart: (state, action: PayloadAction<Array<Product & { quantity: number }>>) => {
            state.products = action.payload
        },
        addProductToCart: (state, action: PayloadAction<Product>) => {
            state.products = [...state.products, { ...action.payload, quantity: 1 }]
            localStorage.setItem('cart', JSON.stringify(state.products))
        },
        removeProductFromCart: (state, action: PayloadAction<Product>) => {
            console.log(state.products)
            state.products = state.products.filter(p => p.id !== action.payload.id)
            localStorage.setItem('cart', JSON.stringify(state.products))
        },
        increaseQuantity: (state, action: PayloadAction<Product>) => {
            console.log(state.products)
            const product = state.products.find(p => p.id === action.payload.id)
            if (!product) {
                return
            }
            product.quantity += 1
            localStorage.setItem('cart', JSON.stringify(state.products))
        },
        decreaseQuantity: (state, action: PayloadAction<Product>) => {
            const product = state.products.find(p => p.id === action.payload.id)
            if (!product) {
                return
            }

            if (product.quantity === 1) {
                cartSlice.caseReducers.removeProductFromCart(state, action)
                return
            }

            product.quantity -= 1
            localStorage.setItem('cart', JSON.stringify(state.products))
        },
    }
})

export const { initializeCart, addProductToCart, removeProductFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions
export const selectCart = (state: RootState) => state.cart as CartState

export default cartSlice.reducer