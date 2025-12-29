import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DeliveryBoyTracking from '../../components/DeliveryBoyTracking'
import { ShieldCheck } from 'lucide-react'
import { sendDeliveryOtp, verifyDeliveryOtp } from '../../store/slice/deliverySlice'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import socket from '../../socket'

const CurrentOrder = () => {
  const { currentOrder, deliveryOtpLoading } = useSelector((state) => state.delivery)
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const [showOtpBox, setShowOtpBox] = useState(false)
  const [deliveryBoyLocation, setDeliveryBoyLocation] = useState(null)


  useEffect(() => {
    if (!socket) {
      return
    }

    let watchId

    if (navigator.geolocation) {
      watchId = navigator.geolocation.watchPosition((position) => {
        const latitude = position.coords.latitude
        const longitude = position.coords.longitude

        setDeliveryBoyLocation({lat: latitude, lon: longitude})

        socket.emit('updateLocation', {
          latitude,
          longitude,
          userId: user._id
        })
      }),
        (error) => {
          console.log(error)
        },
      {
        enableHighAccuracy: true
      }
    }

    return () => {
      if (watchId) {
        navigator.geolocation.clearWatch(watchId)
      }
    }
  }, [socket, user])

  const handleDelivered = async (orderId, shopOrderId) => {
    try {
      await dispatch(sendDeliveryOtp({ orderId, shopOrderId })).unwrap()
      setShowOtpBox(true)
      toast.success('otp sended')
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const data = {
        orderId: currentOrder._id,
        shopOrderId: currentOrder.shopOrder._id,
        otp: e.target.otp.value
      }
      await dispatch(verifyDeliveryOtp(data)).unwrap()
      toast.success('order delivery successfully')
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <div className="max-w-2xl bg-white mt-5 rounded-2xl mx-auto min-h-screen p-4">
      {/* Shop Section */}
      <div className="bg-white rounded-xl shadow-sm p-5 mb-4 border-l-4 border-blue-600">
        <h1 className="text-xl font-bold text-gray-800 uppercase tracking-tight">
          {currentOrder.shop.name}
        </h1>
        <p className="text-gray-600 text-sm mt-1 flex items-start">
          <span className="mr-2">📍</span>
          {currentOrder.shop.address}, {currentOrder.shop.state}
        </p>
      </div>

      {/* Customer Details Card */}
      <div className="bg-white rounded-xl shadow-sm p-5 space-y-4">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
          Customer Details
        </h2>

        <div className="flex flex-col gap-3">
          {/* Name */}
          <div>
            <p className="text-sm text-gray-500 italic">Customer Name</p>
            <p className="text-lg font-semibold text-gray-900">{currentOrder.user.fullName}</p>
          </div>

          {/* Contact - Making it easy to tap and call */}
          <div className="flex justify-between items-center bg-blue-50 p-3 rounded-lg">
            <div>
              <p className="text-xs text-blue-600 font-medium">Mobile Number</p>
              <p className="text-md font-bold text-blue-900">{currentOrder.user.mobile}</p>
            </div>
            <a href={`tel:${currentOrder.user.mobile}`} className="bg-blue-600 text-white p-2 rounded-full shadow-md">
              📞
            </a>
          </div>

          {/* Address */}
          <div className="pt-2 border-t border-gray-100">
            <p className="text-sm text-gray-500 italic">Delivery Address</p>
            <p className="text-md text-gray-800 font-medium leading-relaxed">
              {currentOrder.deliveryAddress.text}
            </p>
          </div>
        </div>
      </div>
      <DeliveryBoyTracking currentOrder={{
        deliveryBoyLocation: deliveryBoyLocation || {
          lat: user?.location?.coordinates[1],
          lon: user?.location?.coordinates[0]
        },
        customerLocation: {
          lat: currentOrder?.deliveryAddress?.latitude,
          lon: currentOrder?.deliveryAddress?.longitude
        }
      }} />
      <div className="p-3 flex items-center justify-center w-full">
        {showOtpBox ? (
          <div className='flex flex-col gap-4 w-full'>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <label htmlFor="otp" className="text-sm md:text-md font-medium text-gray-700">
                OTP sent to customer <span className='font-bold text-orange-600'>{currentOrder.user.fullName}'s</span> email
              </label>

              <div className="relative">
                <input
                  type="text"
                  id="otp"
                  inputMode="numeric"
                  name='otp'
                  maxLength={6}
                  placeholder="● ● ● ● ● ●"
                  className="w-full border border-gray-300 focus:border-orange-500 focus:ring-2 focus:ring-orange-200 outline-none rounded-xl pl-12 pr-4 py-3 text-center tracking-widest font-bold text-xl transition-all"
                  required
                />
                {/* OTP Icon - Input er bhitore thakbe */}
                <ShieldCheck
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-orange-500 size-6"
                />
              </div>

              <button
                type='submit'
                className="w-full py-3.5 font-bold text-white transition-all duration-200 bg-orange-600 rounded-xl hover:bg-orange-700 focus:ring-4 focus:ring-orange-200 shadow-md active:scale-[0.98] uppercase tracking-wide"
              >
                {deliveryOtpLoading ? 'Verifying..' : 'Verify Otp'}
              </button>
            </form>
          </div>
        ) : (
          <button
            type='button'
            disabled={deliveryOtpLoading}
            onClick={() => handleDelivered(currentOrder._id, currentOrder.shopOrder._id)}
            className={`px-8 py-3 font-bold text-white transition-all ${deliveryOtpLoading && 'cursor-not-allowed'} cursor-pointer duration-200 bg-indigo-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-700 shadow-lg active:scale-95`}
          >
            {deliveryOtpLoading ? 'Mark Delivering...' : 'Mark as Delivered'}
          </button>
        )}
      </div>
    </div>
  )
}

export default CurrentOrder