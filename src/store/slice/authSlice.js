import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const SERVER_URL = `${import.meta.env.VITE_SERVER_URL}/api/auth`

export const registration = createAsyncThunk(
    'auth/registration',
    async (data, { rejectWithValue }) => {
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
    async (data, { rejectWithValue }) => {
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
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.post(`${SERVER_URL}/login`, data,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const logout = createAsyncThunk(
    'auth/logout',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/logout`,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const forgetPassword = createAsyncThunk(
    'auth/forgetPassword',
    async (data, { rejectWithValue }) => {
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
    async (data, { rejectWithValue }) => {
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
    async (data, { rejectWithValue }) => {
        try {
            const res = await axios.patch(`${SERVER_URL}/reset-pass`, data)
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const fetchUser = createAsyncThunk(
    'auth/fetchUser',
    async (_, { rejectWithValue }) => {
        try {
            const res = await axios.get(`${SERVER_URL}/get-user`,
                { withCredentials: true }
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

export const updateUserLocation = createAsyncThunk(
    'auth/update',
    async(data, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${SERVER_URL}/update-location`, data,
                {withCredentials: true}
            )
            return res.data
        } catch (error) {
            return rejectWithValue(error?.response?.data || "Something went wrong")
        }
    }
)

const initialState = {
    loading: false,
    error: null,
    user: null,
    address: null,
    state: null,
    city: null,
    socket: null
}

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAddress: (state, action) => {
            state.address = action.payload
        },
        setState: (state, action) => {
            state.state = action.payload
        },
        setCity: (state, action) => {
            state.city = action.payload
        },
        setSocket: (state, action) => {
            state.socket = action.payload
        }
    },
    extraReducers: (builder) => {
        //registration
        builder
            .addCase(registration.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(registration.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(registration.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
        //verifyRegi
        builder
            .addCase(verifyRegi.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(verifyRegi.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(verifyRegi.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
        //login
        builder
            .addCase(login.pending, (state) => {
                state.loading = true
                state.error = null
                state.user = null
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.data
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
        //logout
        builder
            .addCase(logout.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(logout.fulfilled, (state) => {
                state.loading = false
                state.user = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
        //forgetPassword
        builder
            .addCase(forgetPassword.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(forgetPassword.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(forgetPassword.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
        //verifyPass
        builder
            .addCase(verifyPass.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(verifyPass.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(verifyPass.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
        //resetPass
        builder
            .addCase(resetPass.pending, (state) => {
                state.loading = true
                state.error = null
            })
            .addCase(resetPass.fulfilled, (state) => {
                state.loading = false
            })
            .addCase(resetPass.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
        //fetchUser
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true
                state.user = null
                state.error = null
            })
            .addCase(fetchUser.fulfilled, (state, action) => {
                state.loading = false
                state.user = action.payload.data
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false
                state.error = action.error
            })
    }
})

export const { setAddress, setState, setCity, setSocket } = authSlice.actions
export default authSlice.reducer