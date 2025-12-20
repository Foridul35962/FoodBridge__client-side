import React from 'react';
import { SearchX, ArrowLeft } from 'lucide-react'; // Using Lucide icons
import { useNavigate } from 'react-router-dom';

const NoShopFound = () => {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center">
            {/* Icon/Illustration Container */}
            <div className="bg-gray-100 p-8 rounded-full mb-6">
                <SearchX size={80} className="text-gray-400" strokeWidth={1.5} />
            </div>

            {/* Main Heading */}
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
                No Restaurants Found
            </h1>

            {/* Description */}
            <p className="text-gray-500 mb-8 max-w-sm">
                We couldn't find any shops matching your search or in your current area.
                Try adjusting your filters or changing your location.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">

                <button className="flex items-center justify-center gap-2 border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-xl font-semibold transition-all">
                    <ArrowLeft size={18} />
                    Go Back
                </button>
            </div>

            {/* Secondary Link */}
            <button
                onClick={() => navigate('/')}
                className="mt-8 text-orange-500 font-medium hover:text-orange-600 transition-colors">
                Browse popular categories instead?
            </button>
        </div>
    );
};

export default NoShopFound;