import React from 'react'
import { useSelector } from 'react-redux'
import Loading from '../components/Loading'
import UserLayout from '../layouts/UserLayout'
import OwnerLayout from '../layouts/OwnerLayout'
import DeliveryLayout from '../layouts/DeliveryLayout'

const Home = () => {
  const { loading, user } = useSelector((state) => state.auth)
  return (
    <>
      {
        loading ? <Loading /> :
          (user?.role === 'user' ? <UserLayout /> :
            (user?.role === 'owner' ? <OwnerLayout /> :
              user?.role === 'deliveryBoy' && <DeliveryLayout />)
          )
      }
    </>
  )
}

export default Home