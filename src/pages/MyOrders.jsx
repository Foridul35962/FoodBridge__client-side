import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrders } from '../store/slice/orderSlice'

const MyOrders = () => {
    const dispatch = useDispatch()
    const {orders} = useSelector((state)=>state.order)
    useEffect(()=>{
        try {
            dispatch(getMyOrders())
        } catch (error) {
            console.log(error)
        }
    },[])
    if (orders) {
        console.log(orders)
    }
  return (
    <div>MyOrders</div>
  )
}

export default MyOrders