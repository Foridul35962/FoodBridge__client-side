import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Registration from './pages/Registration'
import MainLayout from './layouts/MainLayout'
import ForgetPass from './pages/ForgetPass'
import { ToastContainer } from 'react-toastify'
import useGetCity from './hooks/UseGetCity'
import UseGetUser from './hooks/UseGetUser'
import ProtectedRoute from './components/ProtectedRoute'
import AddEditShop from './pages/owner/addEditShop'
import AddEditFood from './pages/owner/AddEditFood'
import CategoryItems from './pages/CategoryItems'
import ShopStore from './pages/ShopStore'
import Food from './pages/Food'
import AllFoodInCity from './pages/AllFoodInCity'



const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
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
      },
      {
        path: '/categories/:category',
        element: <ProtectedRoute role={'user'}> <CategoryItems /> </ProtectedRoute>
      },
      {
        path: '/food/:foodId',
        element: <Food />
      },
      {
        path: '/all-foods',
        element: <ProtectedRoute role={'user'}> <AllFoodInCity /> </ProtectedRoute>
      },
      {
        path: '/shop/:shopId',
        element: <ProtectedRoute role={'user'}> <ShopStore /> </ProtectedRoute>
      },
      {
        path: '/add-edit-shop',
        element: <ProtectedRoute role={'owner'}> <AddEditShop /> </ProtectedRoute>
      },
      {
        path: '/add-edit-food',
        element: <ProtectedRoute role={'owner'}> <AddEditFood /> </ProtectedRoute>
      },
    ]
  }
])

const App = () => {

  //fetchUser
  UseGetUser()
  useGetCity()

  return (
    <>
      <ToastContainer />
      <RouterProvider router={router} />
    </>
  )
}

export default App