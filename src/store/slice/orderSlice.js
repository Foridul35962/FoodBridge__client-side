import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/order`

export const placeOrder = createAsyncThunk(
    'order/placeOrder',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL}/place-order`, data,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const initialState = {
    orderLoading: false,
    orders: []
}

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //place order
        builder
            .addCase(placeOrder.pending, (state) => {
                state.orderLoading = true
            })
            .addCase(placeOrder.fulfilled, (state, action) => {
                state.orderLoading = false
                console.log(action.payload)
                state.orders = state.orders.push(action.payload.data)
            })
            .addCase(placeOrder.rejected, (state) => {
                state.orderLoading = false
            })
    }
})

export default orderSlice.reducer