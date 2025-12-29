import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrders } from '../store/slice/orderSlice'
import UserOrderCart from '../components/pages/UserOrderCart'
import OwnerOrderCart from '../components/pages/OwnerOrderCart'
import DeliveryBoyOrderCart from '../components/pages/DeliveryBoyOrderCart'
import Loading from '../components/Loading'

const MyOrders = () => {
    const dispatch = useDispatch()
    const { orders, orderLoading } = useSelector((state) => state.order)
    const { user } = useSelector((state) => state.auth)
    useEffect(() => {
        if (!user) return

        if (user.role !== 'deliveryBoy') {
            dispatch(getMyOrders())
        }
    }, [dispatch, user])

    return (
        <>
            {
                orderLoading ? <Loading /> :
                    user?.role === 'user' && Array.isArray(orders) ? <UserOrderCart orders={orders} /> :
                        user?.role === 'owner' ? <OwnerOrderCart orders={orders} /> :
                            user?.role === 'deliveryBoy' && <DeliveryBoyOrderCart />
            }
        </>
    )
}

export default MyOrders