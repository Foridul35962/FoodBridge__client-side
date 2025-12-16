import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser } from '../store/slice/authSlice'

const UseGetUser = async () => {
    const {user} = useSelector((state)=>state.auth)
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchUser())
    },[user])
}

export default UseGetUser