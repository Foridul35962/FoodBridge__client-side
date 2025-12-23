import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getDeliveryAssignment } from '../store/slice/deliverySlice'
import Loading from '../components/Loading'
import DeliveryBoyHome from '../pages/deliveryBoy/DeliveryBoyHome'

const DeliveryLayout = () => {
  const { deliveryLoading } = useSelector((state) => state.delivery)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getDeliveryAssignment())
  }, [])
  return (
    <>
      {
        deliveryLoading ? <Loading /> : <DeliveryBoyHome />
      }
    </>
  )
}

export default DeliveryLayout