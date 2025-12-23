import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateUserLocation } from '../store/slice/authSlice'

const UseUpdateLocation = () => {
    const dispatch = useDispatch()

    useEffect(() => {
        let watchId;
        const updateLocation = async (lat, lon) => {
            try {
                await dispatch(updateUserLocation({ lat, lon })).unwrap();
            } catch (error) {
            }
        };

        if (navigator.geolocation) {
            watchId = navigator.geolocation.watchPosition(
                (pos) => {
                    const { latitude, longitude } = pos.coords;
                    updateLocation(latitude, longitude);
                },
                (err) => console.error(err),
                {
                    enableHighAccuracy: true,
                    maximumAge: 10000,
                    timeout: 5000
                }
            );
        }

        return () => {
            if (watchId) navigator.geolocation.clearWatch(watchId);
        };
    }, [dispatch]);
}

export default UseUpdateLocation