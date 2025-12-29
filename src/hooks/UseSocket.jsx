import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setSocketConnected } from '../store/slice/authSlice'
import socket from '../socket'

const UseSocket = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)

    useEffect(() => {
        if (!user) return

        if (!socket.connected) {
            socket.connect()
        }

        socket.on('connect', () => {
            dispatch(setSocketConnected(true))
            socket.emit('identity', { userId: user._id })
        })

        socket.on('disconnect', () => {
            dispatch(setSocketConnected(false))
        })

        return () => {
            socket.off('connect')
            socket.off('disconnect')
        }
    }, [user?._id])

    return null
}

export default UseSocket