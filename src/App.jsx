import React from 'react'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import UserLayout from './layouts/UserLayout'
import ForgetPass from './pages/ForgetPass'
import { ToastContainer } from 'react-toastify'
import useGetCity from './hooks/UseGetCity'
import UseGetUser from './hooks/UseGetUser'
import { useSelector } from 'react-redux'

const App = () => {

  //fetchUser
  UseGetUser()
  useGetCity()
  const { user } = useSelector((state) => state.auth)


  const router = createBrowserRouter([
    {
      path: '/',
      element: <UserLayout />,
      children: [
        {
          path: '/',
          element: <Home />
        },
        {
          path: '/login',
          element: user ? <Navigate to='/' /> : <Login />
        },
        {
          path: '/registration',
          element: user ? <Navigate to='/' /> : <Registration />
        },
        {
          path: '/forget-pass',
          element: user ? <Navigate to='/' /> : <ForgetPass />
        }
      ]
    }
  ])
  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App