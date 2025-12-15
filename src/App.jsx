import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import UserLayout from './layouts/UserLayout'

const App = () => {

  const router = createBrowserRouter([
    {
      path: '/',
      element: <UserLayout />,
      children:[
        {
          path:'/',
          element: <Home/>
        },
        {
          path: '/login',
          element: <Login />
        },
        {
          path: '/registration',
          element : <Registration />
        }
      ]
    }
  ])
  return (
    <RouterProvider router={router}/>
  )
}

export default App