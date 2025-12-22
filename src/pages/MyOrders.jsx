import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrders } from '../store/slice/orderSlice'
import UserOrderCart from '../components/pages/UserOrderCart'
import OwnerOrderCart from '../components/pages/OwnerOrderCart'

const MyOrders = () => {
    const dispatch = useDispatch()
    const { orders } = useSelector((state) => state.order)
    const { user } = useSelector((state) => state.auth)
    useEffect(() => {
        try {
            dispatch(getMyOrders())
        } catch (error) {
            console.log(error)
        }
    }, [])
    return (
        <>
            {
                user?.role === 'user' ? <UserOrderCart orders={orders}/> :
                    user?.role === 'owner' && <OwnerOrderCart orders={orders} />
            }
        </>
    )
}

export default MyOrders