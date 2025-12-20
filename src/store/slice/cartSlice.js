import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cartItems:[]
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers:{
        addToCart: (state, action) => {
            const existingItem = state.cartItems.find(
                (item) => item.itemId === action.payload.itemId
            );
            if (existingItem) {
                existingItem.itemQuantity = action.payload.itemQuantity;
            } else {
                state.cartItems.push({ ...action.payload });
            }
        }
    }
})

export const {addToCart} = cartSlice.actions
export default cartSlice.reducer

