import React from 'react';
import { UtensilsCrossed, ArrowLeft, Store } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NoFoodInRestaurant = () => {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen bg-orange-50 flex flex-col">
            <main className="flex-1 flex flex-col items-center justify-center px-6">

                {/* Animated/Illustration Area */}
                <div className="relative mb-8">
                    <div className="bg-orange-100 p-10 rounded-full">
                        <UtensilsCrossed size={80} className="text-orange-500 opacity-80" />
                    </div>
                    {/* Small badge icon */}
                    <div className="absolute -bottom-2 -right-2 bg-white p-2 rounded-full shadow-lg">
                        <Store size={24} className="text-gray-400" />
                    </div>
                </div>

                {/* Text Content */}
                <h2 className="text-2xl font-bold text-gray-900 mb-2 text-center">
                    The Kitchen is Quiet!
                </h2>
                <p className="text-gray-500 text-center max-w-sm mb-10 leading-relaxed">
                    This restaurant hasn't added any food items to their menu yet, or everything is currently sold out.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col w-full max-w-xs gap-4">
                    <button
                        onClick={() => navigate('/')}
                        className="w-full cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-2xl transition-all shadow-lg shadow-orange-200 active:scale-95">
                        View Other Restaurants
                    </button>
                </div>
            </main>
        </div>
    );
};

export default NoFoodInRestaurant;