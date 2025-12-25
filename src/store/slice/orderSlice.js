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

export const getMyOrders = createAsyncThunk(
    'order/myOrders',
    async (_, {rejectWithValue})=>{
        try {
            const res = await axios.get(`${SERVER_URL}/my-orders`,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const changeOrderStatus = createAsyncThunk(
    'order/status',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/change-status`, data,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getOrderById = createAsyncThunk(
    "order/getOrderById",
    async(orderId, {rejectWithValue})=>{
        try {
            const res = await axios.get(`${SERVER_URL}/get-order/${orderId}`,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)


const initialState = {
    orderLoading: false,
    orders: [],
    order: null
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
                state.orders = state.orders.push(action.payload.data)
            })
            .addCase(placeOrder.rejected, (state) => {
                state.orderLoading = false
            })
        //get order
        builder
            .addCase(getMyOrders.pending, (state) => {
                state.orderLoading = true
            })
            .addCase(getMyOrders.fulfilled, (state, action) => {
                state.orderLoading = false
                state.orders = action.payload.data
            })
            .addCase(getMyOrders.rejected, (state) => {
                state.orderLoading = false
            })
        //change status
        builder
            .addCase(changeOrderStatus.pending, (state) => {
                state.orderLoading = true
            })
            .addCase(changeOrderStatus.fulfilled, (state, action) => {
                state.orderLoading = false
                const updatedOrder = action.payload.data
                const index = state.orders.findIndex((order)=>order._id === updatedOrder._id)
                if (index > -1) {
                    state.orders[index] = updatedOrder
                }
            })
            .addCase(changeOrderStatus.rejected, (state) => {
                state.orderLoading = false
            })
        //get order by Id
        builder
            .addCase(getOrderById.pending, (state) => {
                state.orderLoading = true
            })
            .addCase(getOrderById.fulfilled, (state, action) => {
                state.orderLoading = false
                state.order = action.payload.data
            })
            .addCase(getOrderById.rejected, (state) => {
                state.orderLoading = false
            })
    }
})

export default orderSlice.reducer