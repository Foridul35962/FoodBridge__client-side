import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import UserLayout from './layouts/UserLayout'
import ForgetPass from './pages/ForgetPass'
import { ToastContainer } from 'react-toastify'
import useGetCity from './hooks/UseGetCity'
import UseGetUser from './hooks/UseGetUser'

const App = () => {

  //fetchUser
  UseGetUser()
  useGetCity()


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
          element: <Login />
        },
        {
          path: '/registration',
          element: <Registration />
        },
        {
          path: '/forget-pass',
          element: <ForgetPass />
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