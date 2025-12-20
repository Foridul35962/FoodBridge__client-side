import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice.js'
import shopReducer from './slice/shopSlice.js'
import itemReducer from './slice/itemSlice.js'
import cartReducer from './slice/cartSlice.js'

const store = configureStore({
    reducer:{
        auth: authReducer,
        shop: shopReducer,
        item: itemReducer,
        cart: cartReducer
    }
})

export default store