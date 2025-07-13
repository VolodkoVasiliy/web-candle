import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IItem, mockShopData } from "@/app/mocks/indes";

export interface CartState {
    products: Array<IItem & { quantity: number }>
}

const initialState: CartState = {
    products: mockShopData.map(s => ({ ...s, quantity: 1 }))
}


export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addProductToCart: (state, action: PayloadAction<IItem>) => {
            if (state.products.find(p => p.id === action.payload.id)) {
                cartSlice.caseReducers.increaseQuantity(state, action)
            } else {
                state.products.push({ ...action.payload, quantity: 1 })
            }
        },
        removeProductFromCart: (state, action: PayloadAction<IItem>) => {
            console.log('deleting')
            state.products = state.products.filter(p => p.id !== action.payload.id)
        },
        increaseQuantity: (state, action: PayloadAction<IItem>) => {
            console.log('increasing')
            const product = state.products.find(p => p.id === action.payload.id)
            if (!product) {
                return
            }
            product.quantity += 1
        },
        decreaseQuantity: (state, action: PayloadAction<IItem>) => {
            const product = state.products.find(p => p.id === action.payload.id)
            if (!product) {
                return
            }

            if (product.quantity === 1) {
                cartSlice.caseReducers.removeProductFromCart(state, action)
                return
            }

            product.quantity -= 1
        },
    }
})

export const { addProductToCart, removeProductFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions
export const selectCart = (state: RootState) => state.cart

export default cartSlice.reducer