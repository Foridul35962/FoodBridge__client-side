import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import DeliveryBoyTracking from '../../components/DeliveryBoyTracking'
import { ShieldCheck } from 'lucide-react'

const CurrentOrder = () => {
  const { currentOrder } = useSelector((state) => state.delivery)
  console.log(currentOrder)
  const [showOtpBox, setShowOtpBox] = useState(false)

  const handleDelivered = () => {
    setShowOtpBox(true)
  }

  const handleSubmit = () => {

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
      <DeliveryBoyTracking currentOrder={currentOrder} />
      <div className="p-3 flex items-center justify-center w-full">
        {showOtpBox ? (
          <div className='flex flex-col gap-1 w-full'>
            <div className="relative">
              <label htmlFor="otp" className="text-md font-medium text-gray-700">
                Otp sended customer <span className='font-bold text-orange-600'>{currentOrder.user.fullName}'s</span> email
              </label>

              <input
                type="text"
                id="otp"
                inputMode="numeric"
                name='otp'
                maxLength={6}
                placeholder="● ● ● ● ● ●"
                className="w-full border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-400 outline-none rounded-xl pl-6 pr-3 py-3 text-center tracking-widest font-semibold text-lg"
                required
              />

              {/* OTP Icon */}
              <ShieldCheck
                className="absolute left-3 bottom-3 text-orange-500 size-7"
              />
            </div>
            <button
              onClick={handleSubmit}
              className="px-8 py-3 font-bold text-white transition-all cursor-pointer duration-200 bg-indigo-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-700 shadow-lg active:scale-95"
            >
              Submit Otp
            </button>
          </div>
        ) : (
          <button
            onClick={handleDelivered}
            className="px-8 py-3 font-bold text-white transition-all cursor-pointer duration-200 bg-indigo-600 font-pj rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600 hover:bg-indigo-700 shadow-lg active:scale-95"
          >
            Mark as Delivered
          </button>
        )}
      </div>
    </div>
  )
}

export default CurrentOrder