import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/auth`

export const register = createAsyncThunk(
    'auth/register',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/register`,
                data
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const verifyRegi = createAsyncThunk(
    'auth/verifyRegi',
    async (data, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/verify-regi`, data)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/login`, data,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async(_, {rejectWithValue})=>{
        try {
            const res = await axios.get(`${SERVER_URL}/logout`,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const forgetPassword = createAsyncThunk(
    'auth/forgetPassword',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/forget-pass`, data)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const verifyPass = createAsyncThunk(
    'auth/verifyPass',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/verify-pass`, data)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const resetPass = createAsyncThunk(
    'auth/resetPass',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/reset-pass`, data)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const initialState = {
    loading: false,
    error: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(register.pending, (state)=>{
            state.loading = true
            state.error = null
        })
        .addCase(register.fulfilled, (state)=>{
            state.loading = false
        })
        .addCase(register.rejected, (state, action)=>{
            state.loading = false
            state.error = action.error
        })
    }
})

export default authSlice.reducer