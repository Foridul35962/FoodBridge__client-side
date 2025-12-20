import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const MainLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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