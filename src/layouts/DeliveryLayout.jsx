import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentOrder, getDeliveryAssignment } from '../store/slice/deliverySlice'
import Loading from '../components/Loading'
import DeliveryBoyHome from '../pages/deliveryBoy/DeliveryBoyHome'
import CurrentOrder from '../pages/deliveryBoy/CurrentOrder'

const DeliveryLayout = () => {
  const { deliveryLoading, currentOrder } = useSelector((state) => state.delivery)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getCurrentOrder())
    dispatch(getDeliveryAssignment())
  }, [dispatch])
  return (
    <>
      {
        deliveryLoading ? <Loading /> : currentOrder ? <CurrentOrder /> : <DeliveryBoyHome />
      }
    </>
  )
}

export default DeliveryLayout