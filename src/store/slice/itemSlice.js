import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
import axios from 'axios'

const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/item`

export const addItem = createAsyncThunk(
    'item/add',
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL}/add-item`, data,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const editItem = createAsyncThunk(
    'item/edit',
    async ({ data, itemId }, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${SERVER_URL}/edit-item/${itemId}`, data,
                { withCredentials: true }
            )
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const deleteItem = createAsyncThunk(
    'item/delete',
    async (itemId, { rejectWithValue }) => {
        try {
            const res = await axios.delete(`${SERVER_URL}/delete`,
                {
                    data: { itemId },
                    withCredentials: true
                }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getAllItem = createAsyncThunk(
    'item/getAll',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/get`)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const getItemById = createAsyncThunk(
    'item/itemById',
    async (itemId, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/get-item-by-id/${itemId}`,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)


const initialState = {
    itemLoading: false,
    allItem: [],
    item: null,
    reletedItem: [],
    uniqueCategoryItems: []
}

const itemSlice = createSlice({
    name: 'item',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        //add item
        builder
            .addCase(addItem.pending, (state) => {
                state.itemLoading = true
            })
            .addCase(addItem.fulfilled, (state) => {
                state.itemLoading = false
            })
            .addCase(addItem.rejected, (state) => {
                state.itemLoading = false
            })

        //edit item
        builder
            .addCase(editItem.pending, (state) => {
                state.itemLoading = true
            })
            .addCase(editItem.fulfilled, (state) => {
                state.itemLoading = false
            })
            .addCase(editItem.rejected, (state) => {
                state.itemLoading = false
            })

        //delete item
        builder
            .addCase(deleteItem.pending, (state) => {
                state.itemLoading = true
            })
            .addCase(deleteItem.fulfilled, (state) => {
                state.itemLoading = false
            })
            .addCase(deleteItem.rejected, (state) => {
                state.itemLoading = false
            })

        //get all item
        builder
            .addCase(getAllItem.pending, (state) => {
                state.itemLoading = true
            })
            .addCase(getAllItem.fulfilled, (state, action) => {
                state.itemLoading = false
                state.allItem = action.payload.data
                state.uniqueCategoryItems = action.payload.data.reduce((acc, current) => {
                    const isExist = acc.find((item) => item.category === current.category)
                    if (!isExist) {
                        acc.push(current)
                    }
                    return acc
                }, [])
            })
            .addCase(getAllItem.rejected, (state) => {
                state.itemLoading = false
            })
        
        //get item by id
        builder
            .addCase(getItemById.pending, (state) => {
                state.itemLoading = true
            })
            .addCase(getItemById.fulfilled, (state, action) => {
                state.itemLoading = false
                state.item = action.payload.data
            })
            .addCase(getItemById.rejected, (state) => {
                state.itemLoading = false
            })
    }
})

export default itemSlice.reducer