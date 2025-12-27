import React from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getOrderById } from '../../store/slice/orderSlice'
import DeliveryBoyTracking from '../../components/DeliveryBoyTracking'

const OrderDetails = () => {
    const { orderId } = useParams()
    const { order } = useSelector((state) => state.order)
    console.log(order)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getOrderById(orderId))
    }, [])
    return (
        <div className="max-w-2xl sm:w-xl md:w-2xl mx-auto p-4 sm:p-6 min-h-screen">
            <h1 className="text-2xl font-extrabold text-gray-900 mb-6 flex items-center">
                <span className="mr-2 text-blue-600">📦</span> Order Details
            </h1>

            <div className="space-y-6">
                {order?.shopOrders?.map((shopOrder, index) => (
                    <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                        {/* Shop Header */}
                        <div className="bg-blue-600 p-4">
                            <h2 className="text-lg font-bold text-white flex items-center">
                                🏪 {shopOrder.shop.name}
                            </h2>
                        </div>

                        <div className="p-5 space-y-4">
                            {/* Items List */}
                            <div>
                                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-2">Ordered Items</p>
                                <div className="flex flex-wrap gap-2">
                                    {shopOrder.shopOrderItems.map((item, i) => (
                                        <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium border border-blue-100">
                                            {item.item.name}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="flex justify-between items-center py-3 border-t border-b border-gray-50">
                                <span className="text-gray-600 font-medium">Sub-total</span>
                                <span className="text-xl font-bold text-gray-900">৳{shopOrder.subTotal}</span>
                            </div>

                            {/* Delivery Boy Section */}
                            {shopOrder.assignedDeliveryBoy ? (
                                <div className="bg-green-50 rounded-xl p-4 border border-green-100 flex items-center gap-4">
                                    <div className="bg-green-200 p-3 rounded-full text-xl">
                                        🛵
                                    </div>
                                    <div className="flex-1">
                                        <p className="text-xs text-green-600 font-bold uppercase">Delivery Partner</p>
                                        <p className="text-gray-900 font-semibold">{shopOrder.assignedDeliveryBoy.fullName}</p>
                                        <p className="text-sm text-gray-600 font-mono">{shopOrder.assignedDeliveryBoy.mobile}</p>
                                    </div>
                                    <a
                                        href={`tel:${shopOrder.assignedDeliveryBoy.mobile}`}
                                        className="bg-white text-green-600 p-2 rounded-lg shadow-sm border border-green-200 hover:bg-green-600 hover:text-white transition-colors"
                                    >
                                        Call
                                    </a>
                                </div>
                            ) : shopOrder.status === "Out of delivery" && (
                                <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 flex items-center gap-3">
                                    <div className="animate-pulse bg-amber-200 w-3 h-3 rounded-full"></div>
                                    <p className="text-sm text-amber-700 font-medium font-italic">
                                        Searching for a delivery partner...
                                    </p>
                                </div>
                            )}
                        </div>
                        {shopOrder.status === "Out of delivery" && <DeliveryBoyTracking currentOrder={{
                            deliveryBoyLocation: {
                                lat: shopOrder.assignedDeliveryBoy?.location.coordinates[1],
                                lon: shopOrder.assignedDeliveryBoy?.location.coordinates[0]
                            },
                            customerLocation: {
                                lat: order.deliveryAddress.latitude,
                                lon: order.deliveryAddress.longitude
                            }
                        }} />}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default OrderDetails