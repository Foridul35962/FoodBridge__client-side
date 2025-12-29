import React, { useEffect } from 'react';
import { Package, MapPin, CreditCard, Store, Calendar } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../../store/slice/orderSlice';
import socket from '../../socket';

const UserOrderCart = ({ orders }) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        if (!socket) return;
        const handleStatusUpdate = ({ orderId, shopOrderId, status }) => {
            dispatch(getMyOrders());
        };
        socket.on("orderStatusUpdated", handleStatusUpdate);
        return () => socket.off("orderStatusUpdated", handleStatusUpdate);
    }, [socket]);



    if (!orders || orders.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center p-8 md:p-12 bg-gray-50 rounded-lg border-2 border-dashed">
                <Package className="w-12 h-12 text-gray-300 mb-4" />
                <p className="text-gray-500 font-medium text-center">No orders found yet!</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto p-2 md:p-4 space-y-6 md:space-y-8">
            <div className="flex items-center justify-between px-2">
                <h2 className="text-xl md:text-2xl font-bold text-gray-900">Order History</h2>
                <span className="text-[10px] md:text-xs font-bold text-gray-400 bg-gray-100 px-3 py-1 rounded-full uppercase">
                    {orders.length} Orders
                </span>
            </div>

            {orders && orders.map((order) => (
                <div key={order._id} className="bg-white rounded-2xl md:rounded-3xl border border-gray-100 shadow-sm overflow-hidden hover:shadow-md transition-shadow">

                    {/* Order Meta Header - Fully Responsive */}
                    <div className="p-4 md:p-6 border-b border-gray-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white">
                        <div className="flex items-center gap-3 md:gap-4 w-full sm:w-auto">
                            <div className="p-2.5 md:p-3 bg-indigo-50 rounded-xl md:rounded-2xl text-indigo-600">
                                <Package size={20} className="md:w-6 md:h-6" />
                            </div>
                            <div className="flex-1">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider leading-none mb-1">Order Ref</p>
                                <p
                                    onClick={() => navigate(`/order/${order._id}`)}
                                    className="text-xs md:text-sm font-bold hover:underline cursor-pointer text-gray-800 tracking-tight truncate max-w-37.5 md:max-w-full">
                                    #{order._id.slice(-10).toUpperCase()}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-6 md:gap-8 w-full sm:w-auto pt-3 sm:pt-0 border-t sm:border-t-0 border-gray-50">
                            <div>
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Date</p>
                                <div className="flex items-center gap-1.5 text-xs md:text-sm font-semibold text-gray-600">
                                    <Calendar size={14} />
                                    {new Date(order.createdAt).toLocaleDateString()}
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-wider mb-1">Total Paid</p>
                                <p className="text-lg md:text-xl font-black text-indigo-600 leading-none">৳{order.totalAmount}</p>
                            </div>
                        </div>
                    </div>

                    {/* Delivery Strip */}
                    <div className="px-4 md:px-6 py-3 bg-slate-50/50 flex items-start gap-2 text-[12px] md:text-[13px] text-slate-500 border-b border-gray-100">
                        <MapPin size={14} className="text-rose-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">Deliver to: <strong className="text-slate-700 font-semibold">{order.deliveryAddress.text}</strong></span>
                    </div>

                    {/* Shop Orders Grid - Responsive Columns */}
                    <div className="p-3 md:p-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
                            {order.shopOrders.map((shopOrder) => (
                                <div key={shopOrder._id} className="bg-white border border-gray-100 rounded-xl md:rounded-2xl p-4 md:p-5 flex flex-col justify-between hover:border-indigo-100 transition-colors">

                                    <div>
                                        {/* Shop Info */}
                                        <div className="flex justify-between items-start mb-4">
                                            <div className="flex items-center gap-2 max-w-[70%]">
                                                <div className="p-1.5 bg-orange-50 rounded-lg text-orange-500 border border-orange-100 shrink-0">
                                                    <Store size={14} />
                                                </div>
                                                <h3 className="font-bold text-gray-800 tracking-tight text-sm md:text-base truncate">{shopOrder.shop.name}</h3>
                                            </div>
                                            <span className={`text-[8px] md:text-[9px] px-2 py-0.5 rounded-full font-black tracking-widest uppercase border whitespace-nowrap ${shopOrder.status === 'Pending'
                                                ? 'bg-amber-50 text-amber-600 border-amber-100'
                                                : 'bg-emerald-50 text-emerald-600 border-emerald-100'
                                                }`}>
                                                {shopOrder.status}
                                            </span>
                                        </div>

                                        {/* Shop Items */}
                                        <div className="space-y-3">
                                            {shopOrder.shopOrderItems.map((itemObj) => (
                                                <div key={itemObj._id} className="flex items-center gap-3">
                                                    <img
                                                        src={itemObj.item.image.url}
                                                        alt={itemObj.item.name}
                                                        className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-lg md:rounded-xl border border-gray-100 shadow-xs"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-[12px] md:text-sm font-bold text-gray-800 truncate leading-tight mb-0.5">{itemObj.item.name}</h4>
                                                        <p className="text-[10px] md:text-[11px] text-gray-400 font-semibold italic">Qty: {itemObj.quantity} × ৳{itemObj.price}</p>
                                                    </div>
                                                    <div className="text-[12px] md:text-sm font-bold text-gray-700">
                                                        ৳{itemObj.quantity * itemObj.price}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Subtotal for Shop */}
                                    <div className="mt-4 pt-3 border-t border-dashed border-gray-100 flex justify-between items-center">
                                        <div className="flex items-center gap-1.5 text-gray-400">
                                            <CreditCard size={12} className="md:w-3.5 md:h-3.5" />
                                            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider">Subtotal</span>
                                        </div>
                                        <span className="text-sm md:text-md font-black text-gray-800 tracking-tighter">৳{shopOrder.subTotal}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default UserOrderCart;