import React from 'react'
import { Outlet } from 'react-router-dom'

const UserLayout = () => {
  return (
      <div className='w-full flex flex-col'>
        <p>header</p>
        {
            <Outlet />
        }
        <p>footer</p>
    </div>
  )
}

export default UserLayout