import React from 'react';
import { MapPin } from 'lucide-react';
import NoShopImage from '../../assets/NoShopImage.png'

const NoFoodFound = () => {
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
          <button className="flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-md flex-1">
            <MapPin size={20} />
            Change Location
          </button>
        </div>

        {/* Optional: Explore Other Options */}
        <div className="mt-8 text-sm text-gray-500">
          <p>
            You can also <button className="text-orange-600 font-semibold hover:underline">try searching for a different cuisine</button> or 
            <button className="text-orange-600 font-semibold hover:underline ml-1">check our available cities.</button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoFoodFound;