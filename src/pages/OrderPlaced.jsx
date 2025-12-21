import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight, ShoppingBag } from 'lucide-react';

const OrderPlaced = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-10 text-center">
        {/* Success Animated Icon Area */}
        <div className="flex justify-center mb-6">
          <div className="bg-green-100 p-5 rounded-full animate-bounce">
            <CheckCircle className="w-12 h-12 text-green-600" />
          </div>
        </div>

        {/* Header Section */}
        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">
          Order Placed Successfully!
        </h1>
        <p className="text-slate-500 mb-8">
          Thank you for your purchase. Your order has been received and is being processed.
        </p>


        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => navigate('/my-orders')}
            className="w-full bg-indigo-600 cursor-pointer hover:bg-indigo-700 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 shadow-lg shadow-indigo-200 flex items-center justify-center group"
          >
            Go to My Orders
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Footer Support Info */}
        <p className="mt-8 text-xs text-slate-400">
          Need help? <span className="text-indigo-500 cursor-pointer hover:underline">Contact Support</span>
        </p>
      </div>
    </div>
  );
};

export default OrderPlaced;