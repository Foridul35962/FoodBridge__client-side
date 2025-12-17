import axios from "axios";
import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCity } from "../store/slice/authSlice";

function useGetCity() {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const lastKeyRef = useRef(null)
    useEffect(() => {
        const key = user?._id || "guest"

        if (lastKeyRef.current === key) return
        lastKeyRef.current = key

        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude
            const longitude = position.coords.longitude
            const location = await axios.get(`https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&format=json&apiKey=${import.meta.env.VITE_GEOAPI_KEY}`)
            const city = location?.data?.results[0]?.city
            dispatch(setCity(city))
        })
    }, [user])
}

export default useGetCity