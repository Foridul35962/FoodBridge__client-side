import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'

const UserLayout = () => {
  return (
      <div className='w-full flex flex-col'>
        <Header />
        {
            <Outlet />
        }
        <p>footer</p>
    </div>
  )
}

export default UserLayout