import { createSlice } from "@reduxjs/toolkit";
import { placeOrder } from "./orderSlice";

const initialState = {
    cartItems: []
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(
                (item) => item._id === action.payload._id
            );
            if (existingItem) {
                existingItem.quantity = action.payload.quantity;
            } else {
                state.cartItems.push({ ...action.payload });
            }
        },
        deleteToCart: (state, action) => {
            const itemId = action.payload
            state.cartItems = state.cartItems.filter((item) => item._id !== itemId)
        }
    },
    extraReducers: (builder) => {
        //check out
        builder
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.orderLoading = false
                state.cartItems = []
            })
    }
})

export const { addToCart, deleteToCart } = cartSlice.actions
export default cartSlice.reducer

