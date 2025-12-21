import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    location: {
        lat: null,
        lon: null
    },
    address: null
}

const mapSlice = createSlice({
    name: 'map',
    initialState,
    reducers: {
        setLocation: (state, action) => {
            const { latitude, longitude } = action.payload
            state.location.lat = latitude
            state.location.lon = longitude
        },
        setAddressMap: (state, action) => {
            state.address = action.payload
        }
    }
})

export const { setLocation, setAddressMap } = mapSlice.actions
export default mapSlice.reducer