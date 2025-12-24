import { useDispatch, useSelector } from 'react-redux';
import {
  MapPin,
  Store,
  ShoppingBag,
  Navigation,
  Clock,
  ChevronRight
} from 'lucide-react';
import { toast } from 'react-toastify'
import { acceptOrder, getCurrentOrder } from '../../store/slice/deliverySlice';

const DeliveryBoyHome = () => {
  const { assainDelivery } = useSelector((state) => state.delivery);
  const dispatch = useDispatch()

  const handleAcceptOrder = async (data) => {
    try {
      await dispatch(acceptOrder(data)).unwrap()
      toast.success('order is accepted')
      dispatch(getCurrentOrder())
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="min-h-screen bg-orange-50">
      {/* Top Professional Header */}
      <div className="bg-[#1E293B] text-white px-6 pt-10 pb-16 rounded-b-[40px] shadow-2xl">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Rider Dashboard</h1>
            <p className="text-slate-400 text-sm mt-1 flex items-center gap-1">
              <Clock size={14} /> Active Assignments
            </p>
          </div>
          <div className="h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-900/20">
            <ShoppingBag size={24} />
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="px-6 sm:px-30 md:px-40 -mt-8">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-100 flex items-center justify-around">
          <div className="text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Orders</p>
            <p className="text-2xl font-black text-slate-800">{assainDelivery?.length || 0}</p>
          </div>
          <div className="h-10 w-px bg-gray-100"></div>
          <div className="text-center">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Status</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
              <p className="text-sm font-bold text-green-600 uppercase">Online</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery List */}
      <div className="px-6 sm:px-30 md:px-40 py-6 space-y-8">
        {assainDelivery && assainDelivery.length > 0 ? (
          assainDelivery.map((order, index) => (
            <div key={index} className="bg-white rounded-4xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">

              {/* Card Header: Shop & Status */}
              <div className="p-6 pb-4 flex justify-between items-start">
                <div className="flex gap-4">
                  <div className="h-12 w-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600">
                    <Store size={24} />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">{order.shopName}</h3>
                    <p className="text-xs text-slate-400 font-medium tracking-wide">Pickup Location</p>
                  </div>
                </div>
                <span className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-tighter">
                  New Order
                </span>
              </div>

              {/* Items Section */}
              <div className="px-6 py-4 space-y-4 bg-slate-50/50">
                {order.items.map((itemObj, idx) => (
                  <div key={idx} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="relative">
                        <img
                          src={itemObj.item?.image?.url || 'https://via.placeholder.com/80'}
                          className="w-16 h-16 rounded-2xl object-cover shadow-sm border border-white"
                          alt="food"
                        />
                        <span className="absolute -top-2 -right-2 bg-slate-800 text-white text-[10px] font-bold h-6 w-6 rounded-lg flex items-center justify-center border-2 border-white">
                          {itemObj.quantity}
                        </span>
                      </div>
                      <div>
                        <p className="font-bold text-slate-700">{itemObj.item.name}</p>
                        <p className="text-sm font-semibold text-blue-600">৳{itemObj.price}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Location & Total */}
              <div className="p-6 pt-4">
                <div className="flex items-start gap-3 mb-6">
                  <div className="mt-1">
                    <MapPin size={20} className="text-red-500" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Deliver To</p>
                    <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                      "{order.deliveryAddress.text}"
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between mb-6 bg-slate-800 p-4 rounded-2xl text-white">
                  <p className="text-sm font-medium opacity-80">Cash to Collect</p>
                  <p className="text-xl font-black">৳{order.subTotal}</p>
                </div>

                {/* Actions */}
                <div className="flex gap-3">
                  <button
                    onClick={() => window.open(`https://www.google.com/maps?q=${order.deliveryAddress.latitude},${order.deliveryAddress.longitude}`)}
                    className="flex-[0.3] bg-white border-2 cursor-pointer border-slate-100 text-slate-600 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 hover:bg-slate-50 transition-active active:scale-95"
                  >
                    <Navigation size={20} />
                  </button>
                  <button
                    onClick={() => handleAcceptOrder(order.assignmentId)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-4 cursor-pointer rounded-2xl font-bold shadow-lg shadow-blue-200 flex items-center justify-center gap-2 transition-all active:scale-95">
                    Accept Delivery <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center pt-20">
            <div className="bg-white p-8 rounded-[40px] shadow-sm mb-4">
              <ShoppingBag size={48} className="text-slate-200" />
            </div>
            <p className="text-slate-500 font-bold text-lg">Waiting for Orders...</p>
            <p className="text-slate-400 text-sm text-center px-10 mt-2 font-medium leading-relaxed">
              New delivery requests will appear here in real-time.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryBoyHome;