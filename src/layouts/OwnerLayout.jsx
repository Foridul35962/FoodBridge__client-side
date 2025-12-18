import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getOwnerItems } from '../store/slice/shopSlice'
import Loading from '../components/Loading'
import ShopNotExists from '../components/ShopNotExists'

const OwnerLayout = () => {
  const dispatch = useDispatch()
  const { shopData, shopLoading } = useSelector((state) => state.shop)

  useEffect(() => {
    const getShopItems = async () => {
      try {
        await dispatch(getOwnerItems()).unwrap()
      } catch (error) {
      }
    }
    getShopItems()
  }, [])
  return (
    <>
      {
        shopLoading ? <Loading /> : !shopData ? <ShopNotExists /> : <div></div>
      }
    </>
  )
}

export default OwnerLayout