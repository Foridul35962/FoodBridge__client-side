import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import UserLayout from './layouts/UserLayout'
import ForgetPass from './pages/ForgetPass'
import { fetchUser } from './store/slice/authSlice'
import { ToastContainer } from 'react-toastify'

const App = () => {

  //fetchUser
  const dispatch = useDispatch()
  dispatch(fetchUser())


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