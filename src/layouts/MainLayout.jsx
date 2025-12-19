import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'

const MainLayout = () => {
  return (
      <div className='w-full flex flex-col bg-orange-50'>
        <Header />
        {
            <Outlet />
        }
        <Footer />
    </div>
  )
}

export default MainLayout