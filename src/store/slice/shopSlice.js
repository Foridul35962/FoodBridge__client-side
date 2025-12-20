import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { deleteItem } from "./itemSlice";

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

export const getShopsByCity = createAsyncThunk(
    'shop/get-shop-by-city',
    async(city, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/get-shop-by-city`, {city})
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getShopItems = createAsyncThunk(
    'shop/get-shop-items',
    async (shopId, {rejectWithValue})=>{
        try {
            const res = await axios.get(`${SERVER_URL}/get-shop-items/${shopId}`,
                {withCredentials: true}
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
    shopItems : [],
    items: [],
    allShopsByCity: [],
    itemsByCity: []
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
                state.items = action.payload.data.items
                state.shopData = action.payload.data.shop
            })
            .addCase(getOwnerItems.rejected, (state) => {
                state.shopLoading = false
            })

        //delete item
        builder
            .addCase(deleteItem.fulfilled, (state, action) => {
                const deletedItemId = action.payload?.data;
                if (deletedItemId) {
                    state.items = state.items.filter(item => item._id !== deletedItemId);
                }
            })
        //get shop by city
        builder
            .addCase(getShopsByCity.pending, (state) => {
                state.shopLoading = true
            })
            .addCase(getShopsByCity.fulfilled, (state, action) => {
                state.shopLoading = false
                state.allShopsByCity = action.payload.data.shops
                state.itemsByCity = action.payload.data.items
            })
            .addCase(getShopsByCity.rejected, (state) => {
                state.shopLoading = false
            })
        //get shop details and items
        builder
            .addCase(getShopItems.pending, (state) => {
                state.shopLoading = true
            })
            .addCase(getShopItems.fulfilled, (state, action) => {
                state.shopLoading = false
                state.shopData = action.payload.data.shop
                state.shopItems = action.payload.data.shopItems
            })
            .addCase(getShopItems.rejected, (state) => {
                state.shopLoading = false
            })
    }
})

export default shopSlice.reducer