import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentOrder } from '../../store/slice/deliverySlice'

const CurrentOrder = () => {
    const {currentOrder} = useSelector((state)=>state.delivery)
    console.log(currentOrder)
  return (
    <div>CurrentOrder</div>
  )
}

export default CurrentOrder