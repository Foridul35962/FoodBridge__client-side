import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slice/authSlice.js'
import shopReducer from './slice/shopSlice.js'

const store = configureStore({
    reducer:{
        auth: authReducer,
        shop: shopReducer
    }
})

export default store