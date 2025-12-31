import React, { useState } from 'react';
import { MapPin, X } from 'lucide-react';
import NoShopImage from '../../assets/NoShopImage.png'
import { useDispatch } from 'react-redux';
import { setCity } from '../../store/slice/authSlice';

const NoFoodFound = () => {

  const dispatch = useDispatch()

  const [showLocationMenu, setShowLocationMenu] = useState(false)

  const handleSetLocation = (e) => {
    e.preventDefault()
    const city = e.target.city.value
    dispatch(setCity(city))
    setShowLocationMenu(false)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-linear-to-br from-orange-50 to-red-50 p-6">
      <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 max-w-lg w-full text-center flex flex-col items-center">
        <div className="mb-8 w-full max-w-75">
          <img
            src={NoShopImage}
            alt="Oops! No food found near you"
            className="w-full h-auto object-contain"
          />
        </div>

        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-800 mb-3 leading-tight">
          Oops! No Restaurants Here
        </h1>

        {/* Subtitle/Description */}
        <p className="text-lg text-gray-600 mb-8 max-w-sm">
          It looks like we couldn't find any food delivery options near you. Let's try something else!
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            onClick={() => setShowLocationMenu(true)}
            className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md flex-1">
            <MapPin size={20} />
            Change Location
          </button>
        </div>

        {showLocationMenu && (
          <div className="absolute left-8 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="p-4 relative">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Enter Location</h3>
              <form onSubmit={handleSetLocation} className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Enter City"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                  name="city"
                  autoFocus
                />
                <button
                  type="submit"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 rounded-md transition-colors duration-200 shadow-md active:scale-95"
                >
                  Set Location
                </button>
              </form>
              <X
                onClick={() => setShowLocationMenu(false)}
                className="text-orange-500 absolute right-4 top-4 cursor-pointer"
                size={20}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NoFoodFound;