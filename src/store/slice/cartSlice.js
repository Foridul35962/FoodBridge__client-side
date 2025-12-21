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

export const { addToCart } = cartSlice.actions
export default cartSlice.reducer

