import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/order`

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

const initialState = {
    deliveryLoading: false,
    assainDelivery: []
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
                console.log(action.payload.data)
                state.assainDelivery = action.payload.data
            })
            .addCase(getDeliveryAssignment.rejected, (state) => {
                state.deliveryLoading = false
            })
    }
})

export default deliverySlice.reducer