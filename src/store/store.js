import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice.js'
import shopReducer from './slice/shopSlice.js'
import itemReducer from './slice/itemSlice.js'
import cartReducer from './slice/cartSlice.js'
import mapReducer from './slice/mapSlice.js'
import orderReducer from './slice/orderSlice.js'

const store = configureStore({
    reducer:{
        auth: authReducer,
        shop: shopReducer,
        item: itemReducer,
        cart: cartReducer,
        map: mapReducer,
        order: orderReducer
    }
})

export default store