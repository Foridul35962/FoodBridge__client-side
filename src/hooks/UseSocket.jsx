import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSocket } from '../store/slice/authSlice'
import { io } from 'socket.io-client'

const UseSocket = () => {
    const dispatch = useDispatch()
    const {user} = useSelector((state)=>state.auth)
    useEffect(() => {
        const socketInstance = io(import.meta.env.VITE_SERVER_URL, {
            withCredentials: true
        })

        dispatch(setSocket(socketInstance))

        socketInstance.on('connect', ()=>{
            if (user) {
                socketInstance.emit('identity', {userId: user._id})
            }
        })

        return ()=>{
            socketInstance.disconnect()
        }
    }, [user?._id])
}

export default UseSocket