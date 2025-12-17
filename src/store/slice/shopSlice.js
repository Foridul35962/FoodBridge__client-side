import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/shop`

export const addShop = createAsyncThunk(
    'shop/add',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL}/add-shop`, data, {
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const editShop = createAsyncThunk(
    'shop/edit',
    async ({ data, shopId }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${SERVER_URL}/edit-shop/${shopId}`, data, {
                withCredentials: true
            })
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getOwnerItems = createAsyncThunk(
    'shop/owner-items',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/my-shop-items`,
                {
                    withCredentials: true
                }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)


const initialState = {
    shopLoading: false,
    shopData: null,
    items: []
}

const shopSlice = createSlice({
    name: "shop",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //create shop
        builder
            .addCase(addShop.pending, (state) => {
                state.shopLoading = true
            })
            .addCase(addShop.fulfilled, (state, action) => {
                state.shopLoading = false
                state.shopData = action.payload.data
            })
            .addCase(addShop.rejected, (state) => {
                state.shopLoading = false
            })
        //edit shop
        builder
            .addCase(editShop.pending, (state) => {
                state.shopLoading = true
            })
            .addCase(editShop.fulfilled, (state, action) => {
                state.shopLoading = false
                state.shopData = action.payload.data
            })
            .addCase(editShop.rejected, (state) => {
                state.shopLoading = false
            })
        //get owner item
        builder
            .addCase(getOwnerItems.pending, (state) => {
                state.shopLoading = true
            })
            .addCase(getOwnerItems.fulfilled, (state, action) => {
                state.shopLoading = false
                state.items = action.payload.data
            })
            .addCase(getOwnerItems.rejected, (state) => {
                state.shopLoading = false
            })
    }
})

export default shopSlice.reducer