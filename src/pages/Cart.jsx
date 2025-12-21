import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart, deleteToCart } from '../store/slice/cartSlice';
import { useNavigate } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

const Cart = () => {
    const { cartItems } = useSelector((state) => state.cart);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // Total calculation
    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const deliveryCharge = cartItems.length > 0 ? 50 : 0;
    const total = subtotal + deliveryCharge;

    const handleChangeQuantity = (item, change) => {
        let newQuantity = item.quantity
        if (change === 'increment') {
            newQuantity += 1
        } else {
            if (newQuantity > 1) {
                newQuantity -= 1
            }
        }
        dispatch(addToCart({ ...item, quantity: newQuantity }))
    }

    const handleRemoveItem = (itemId)=>{
        dispatch(deleteToCart(itemId))
    }

    return (
        <div className="min-h-screen bg-orange-50 py-8 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 border-b pb-4">Your Shopping Cart</h2>

                {cartItems.length === 0 ? (
                    <div className="text-center py-20 bg-white rounded-lg shadow">
                        <p className="text-xl text-gray-500">Your cart is empty!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left side: Item List */}
                        <div className="lg:col-span-2 space-y-4">
                            {cartItems.map((item) => (
                                <div key={item._id} className="flex items-center bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-24 h-24 object-cover rounded-lg"
                                    />
                                    <div className="ml-4 flex-1">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="font-semibold text-lg text-gray-800">{item.name}</h3>
                                                <p className="text-sm text-gray-500 capitalize">{item.category} • {item.itemFoodTypes}</p>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className={`px-2 py-1 rounded text-xs font-bold ${item.foodTypes === 'veg' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                                                    ●
                                                </span>
                                                {/* Delete Button */}
                                                <button
                                                    onClick={() => handleRemoveItem(item._id)}
                                                    className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                                                    title="Remove item"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex justify-between items-center">
                                            <div className="flex items-center border rounded-lg bg-gray-50">
                                                <button onClick={() => handleChangeQuantity(item, 'decrement')}
                                                    className="px-3 py-1 hover:bg-gray-200 cursor-pointer rounded-lg">-</button>
                                                <span className="px-3 py-1 font-medium">{item.quantity}</span>
                                                <button onClick={() => handleChangeQuantity(item, 'increment')}
                                                    className="px-3 py-1 hover:bg-gray-200 cursor-pointer rounded-lg">+</button>
                                            </div>
                                            <p className="font-bold text-gray-900">৳{item.price * item.quantity}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Right side: Summary & Checkout */}
                        <div className="lg:col-span-1">
                            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 sticky top-8">
                                <h3 className="text-lg font-bold text-gray-800 mb-4">Order Summary</h3>

                                <div className="space-y-3 text-gray-600">
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>৳{subtotal}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Delivery Fee</span>
                                        <span>৳{deliveryCharge}</span>
                                    </div>
                                    <hr className="my-2" />
                                    <div className="flex justify-between text-xl font-bold text-gray-900">
                                        <span>Total</span>
                                        <span>৳{total}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => navigate('/checkout')}
                                    className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white cursor-pointer font-bold py-3 rounded-xl transition duration-200 shadow-lg shadow-orange-200">
                                    Proceed to Checkout
                                </button>

                                <p className="text-xs text-center text-gray-400 mt-4">
                                    Tax and other charges might be added at checkout.
                                </p>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </div>
    );
};

export default Cart;