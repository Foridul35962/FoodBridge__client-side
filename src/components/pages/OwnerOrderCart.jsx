import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Package, Phone, MapPin, Clock, CreditCard, ShoppingBag, ChevronDown, Truck, Mail } from 'lucide-react';
import { changeOrderStatus, getMyOrders } from '../../store/slice/orderSlice';
import socket from '../../socket';
import { toast } from 'react-toastify'
import Loading from '../Loading';

const OwnerOrderCart = ({ orders }) => {
    const dispatch = useDispatch();
    const { orderLoading } = useSelector((state) => state.order)

    useEffect(() => {
        if (!socket) return;

        const handleOrderUpdate = () => dispatch(getMyOrders());

        socket.on("newOrder", handleOrderUpdate);
        socket.on("orderStatusUpdated", handleOrderUpdate);

        return () => {
            socket.off("newOrder", handleOrderUpdate);
            socket.off("orderStatusUpdated", handleOrderUpdate);
        };
    }, [socket, dispatch]);


    const handleStatusChange = async (orderId, shopId, status) => {
        try {
            await dispatch(changeOrderStatus({ orderId, shopId, status })).unwrap()
        } catch (error) {
            toast.error(error.message)
        }
    };

    return (
        <>
            {
                orderLoading ? <Loading /> : (!orders || orders.length === 0) ?
                    <div className="flex flex-col items-center justify-center p-12 bg-white rounded-3xl border-2 border-dashed border-slate-200">
                        <ShoppingBag className="w-16 h-16 text-slate-200 mb-4" />
                        <p className="text-slate-500 font-medium text-lg text-center">No orders received yet.</p>
                    </div> :
                    <div className="max-w-6xl mx-auto p-4 md:p-6 space-y-8">
                        <div className="border-b border-slate-200 pb-5">
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Manage Orders</h2>
                            <p className="text-slate-500 text-sm mt-1 font-medium">Update order status and track customer deliveries</p>
                        </div>

                        <div className="grid grid-cols-1 gap-8">
                            {orders.map((order) => {
                                const shopOrdersList = Array.isArray(order.shopOrders)
                                    ? order.shopOrders
                                    : [order.shopOrders];

                                return (
                                    <div key={order._id} className="bg-white rounded-4xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-all">

                                        {/* Order Info Strip */}
                                        <div className="bg-slate-900 p-4 px-6 flex flex-wrap justify-between items-center gap-4 text-white">
                                            <div className="flex items-center gap-2">
                                                <Package size={18} className="text-indigo-400" />
                                                <span className="text-xs font-bold uppercase tracking-widest">Order ID: {order._id.slice(-10).toUpperCase()}</span>
                                            </div>
                                            <div className="flex items-center gap-4 text-xs font-medium text-slate-400">
                                                <span className="flex items-center gap-1"><Clock size={14} /> {new Date(order.createdAt).toLocaleDateString()}</span>
                                                <span className="bg-indigo-600 text-white px-2 py-0.5 rounded uppercase font-bold text-[10px]">{order.paymentMethod}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-col md:flex-row">
                                            {/* Customer Info Section */}
                                            <div className="p-6 md:w-1/3 bg-slate-50/50 border-b md:border-b-0 md:border-r border-slate-100">
                                                <div className="mb-6">
                                                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Customer Details</p>
                                                    <div className="flex items-center gap-3 mb-4">
                                                        <div className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center text-slate-600 shadow-sm font-bold">
                                                            {order.user?.fullName?.charAt(0) || "U"}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <h3 className="font-bold text-slate-900 truncate text-sm">{order.user?.fullName}</h3>
                                                            <p className="text-xs text-slate-500 truncate">{order.user?.email}</p>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                                                            <Phone size={14} className="text-indigo-500" /> {order.user?.mobile}
                                                        </div>
                                                        <div className="flex items-start gap-2 text-xs text-slate-500 leading-relaxed">
                                                            <MapPin size={14} className="text-rose-500 shrink-0 mt-0.5" />
                                                            {order.deliveryAddress?.text}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Order Items & Status Update Section */}
                                            <div className="p-6 md:w-2/3">
                                                <div className="space-y-6">
                                                    {shopOrdersList.map((shopOrder) => (
                                                        <div key={shopOrder._id} className="space-y-4">

                                                            {/* Status Selector */}
                                                            <div className="flex items-center justify-between bg-white border border-indigo-100 p-3 rounded-2xl shadow-sm">
                                                                <span className="text-xs font-bold text-slate-500 uppercase ml-2 tracking-tighter">Current Status</span>
                                                                {
                                                                    shopOrder.status === 'Delivered' ?
                                                                        <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl border border-emerald-100 shadow-sm ring-1 ring-emerald-500/10">
                                                                            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                                                            <span className="text-xs font-black uppercase tracking-tight">
                                                                                {shopOrder.status}
                                                                            </span>
                                                                        </div> :
                                                                        <div className="relative">
                                                                            <select
                                                                                value={shopOrder.status}
                                                                                onChange={(e) => handleStatusChange(order._id, shopOrder.shop, e.target.value)}
                                                                                className="appearance-none bg-indigo-50 text-indigo-700 text-xs font-black py-2 px-4 pr-10 rounded-xl outline-none focus:ring-2 focus:ring-indigo-400 cursor-pointer transition-all"
                                                                            >
                                                                                <option value="Pending">Pending</option>
                                                                                <option value="Preparing">Preparing</option>
                                                                                <option value="Out of delivery">Out of delivery</option>
                                                                            </select>
                                                                            <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-indigo-700 pointer-events-none" />
                                                                        </div>
                                                                }
                                                            </div>
                                                            {/* Delivery Candidates Selection */}
                                                            {shopOrder?.assignment?.status === "brodcasted" &&
                                                                shopOrder.assignment.brodcastedTo?.length > 0 && (
                                                                    <div className="mt-4 border-2 border-dashed border-slate-200 rounded-3xl p-5 bg-slate-50/30">
                                                                        <div className="flex items-center justify-between mb-1">
                                                                            <div>
                                                                                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
                                                                                    Available Partners
                                                                                </p>
                                                                                <h4 className="text-sm font-bold text-slate-900">
                                                                                    Assign for Delivery
                                                                                </h4>
                                                                            </div>
                                                                        </div>

                                                                        <div className="grid grid-cols-1 gap-1">
                                                                            {shopOrder.assignment.brodcastedTo.map((candidate, idx) => (
                                                                                <div key={idx}>
                                                                                    <p className=" text-sm font-semibold">{candidate.fullName} -  {candidate.mobile}</p>
                                                                                </div>
                                                                            ))}
                                                                        </div>
                                                                    </div>
                                                                )}

                                                            {/* NEW: Delivery Boy Details */}
                                                            {shopOrder.assignedDeliveryBoy && (
                                                                <div className="p-4 bg-indigo-50/30 border border-indigo-100 rounded-2xl">
                                                                    <p className="text-[10px] font-black text-indigo-500 uppercase tracking-widest mb-3 flex items-center gap-1">
                                                                        <Truck size={12} /> Delivery Partner
                                                                    </p>
                                                                    <div className="flex flex-wrap items-center justify-between gap-4">
                                                                        <div className="flex items-center gap-3">
                                                                            <div className="w-9 h-9 bg-white border border-indigo-200 text-indigo-600 rounded-full flex items-center justify-center font-bold text-sm shadow-sm">
                                                                                {shopOrder.assignedDeliveryBoy.fullName?.charAt(0)}
                                                                            </div>
                                                                            <div>
                                                                                <p className="text-sm font-bold text-slate-800 leading-none">{shopOrder.assignedDeliveryBoy.fullName}</p>
                                                                                <p className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                                                                                    <Mail size={10} /> {shopOrder.assignedDeliveryBoy.email}
                                                                                </p>
                                                                            </div>
                                                                        </div>
                                                                        <div className="bg-indigo-600 px-3 py-1.5 rounded-lg flex items-center gap-2 text-white shadow-sm">
                                                                            <Phone size={12} />
                                                                            <span className="text-xs font-bold">{shopOrder.assignedDeliveryBoy.mobile}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}

                                                            {/* Items List */}
                                                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                                {shopOrder.shopOrderItems?.map((itemObj, i) => (
                                                                    <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
                                                                        <img src={itemObj.item?.image?.url} className="w-12 h-12 rounded-xl object-cover bg-white p-0.5 border" alt="" />
                                                                        <div className="min-w-0">
                                                                            <p className="text-xs font-bold text-slate-800 truncate leading-none mb-1">{itemObj.item?.name}</p>
                                                                            <p className="text-[10px] text-slate-400 font-bold tracking-tight uppercase">Price: {itemObj.price} BDT</p>
                                                                            <p className="text-[10px] text-slate-400 font-bold tracking-tight uppercase">Qty: {itemObj.quantity}</p>
                                                                        </div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {/* Footer */}
                                                            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                                                                <div className="flex items-center gap-1 text-slate-400">
                                                                    <CreditCard size={14} />
                                                                    <span className="text-[10px] font-black uppercase tracking-widest">Total Bill</span>
                                                                </div>
                                                                <div className="text-xl font-black text-slate-900 tracking-tighter">
                                                                    ৳{shopOrder.subTotal}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
            }
        </>
    );
};

export default OwnerOrderCart;