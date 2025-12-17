import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../store/slice/authSlice'

const UseGetUser = () => {
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(fetchUser())
    },[])
}

export default UseGetUser