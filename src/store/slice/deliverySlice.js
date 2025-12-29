import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/order`
const SERVER_URL_DELI = `${import.meta.env.VITE_SERVER_URL}/api/delivery`

export const getDeliveryAssignment = createAsyncThunk(
    'delivery/getDeliveryAssignment',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/get-assignments`,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const acceptOrder = createAsyncThunk(
    'delivery/acceptOrder',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/accept-order/${data}`,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getCurrentOrder = createAsyncThunk(
    'delivery/getCurrentOrder',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL_DELI}/get-current-order`,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const sendDeliveryOtp = createAsyncThunk(
    'delivery/sendDeliveryOtp',
    async (data, { rejectWithValue }) => {
        console.log(data)
        try {
            const res = await axios.post(`${SERVER_URL_DELI}/send-otp`, data,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const verifyDeliveryOtp = createAsyncThunk(
    'delivery/verifyDeliveryOtp',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL_DELI}/verify-otp`, data,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getTodayDeliveries = createAsyncThunk(
    'delivery/getTodayDeliveries',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL_DELI}/todays-deliveries`, {
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const initialState = {
    deliveryLoading: false,
    deliveryOtpLoading: false,
    assainDelivery: [],
    currentOrder: null,
    todaysDeliveries: []
}

const deliverySlice = createSlice({
    name: 'delivery',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //get delivery assaignment
        builder
            .addCase(getDeliveryAssignment.pending, (state) => {
                state.deliveryLoading = true
            })
            .addCase(getDeliveryAssignment.fulfilled, (state, action) => {
                state.deliveryLoading = false
                state.assainDelivery = action.payload.data
            })
            .addCase(getDeliveryAssignment.rejected, (state) => {
                state.deliveryLoading = false
            })
        //delivery accepted
        builder
            .addCase(acceptOrder.pending, (state) => {
                state.deliveryLoading = true
            })
            .addCase(acceptOrder.fulfilled, (state, action) => {
                state.deliveryLoading = false
                state.assainDelivery = []
            })
            .addCase(acceptOrder.rejected, (state) => {
                state.deliveryLoading = false
            })
        //current delivery order
        builder
            .addCase(getCurrentOrder.pending, (state) => {
                state.deliveryLoading = true
            })
            .addCase(getCurrentOrder.fulfilled, (state, action) => {
                state.deliveryLoading = false
                state.currentOrder = action.payload.data
            })
            .addCase(getCurrentOrder.rejected, (state) => {
                state.deliveryLoading = false
            })
        //send delivery otp
        builder
            .addCase(sendDeliveryOtp.pending, (state) => {
                state.deliveryOtpLoading = true
            })
            .addCase(sendDeliveryOtp.fulfilled, (state, action) => {
                state.deliveryOtpLoading = false
            })
            .addCase(sendDeliveryOtp.rejected, (state) => {
                state.deliveryOtpLoading = false
            })
        //verify delivery otp
        builder
            .addCase(verifyDeliveryOtp.pending, (state) => {
                state.deliveryOtpLoading = true
            })
            .addCase(verifyDeliveryOtp.fulfilled, (state, action) => {
                state.deliveryOtpLoading = false
                state.currentOrder = null
            })
            .addCase(verifyDeliveryOtp.rejected, (state) => {
                state.deliveryOtpLoading = false
            })
        //verify delivery otp
        builder
            .addCase(getTodayDeliveries.pending, (state) => {
                state.deliveryOtpLoading = true
            })
            .addCase(getTodayDeliveries.fulfilled, (state, action) => {
                state.deliveryOtpLoading = false
                state.todaysDeliveries = action.payload.data
            })
            .addCase(getTodayDeliveries.rejected, (state) => {
                state.deliveryOtpLoading = false
            })
    }
})

export default deliverySlice.reducer