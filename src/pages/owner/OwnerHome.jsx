import { UtensilsCrossed, MapPin, Plus, Pencil, Trash2 } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteItem } from '../../store/slice/itemSlice'
import { toast } from 'react-toastify'

const OwnerHome = () => {
    const { shopData, items } = useSelector((state) => state.shop)
    const { itemLoading } = useSelector((state) => state.item)
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleDelete = async (itemId)=>{
        try {
            await dispatch(deleteItem(itemId)).unwrap()
            toast.success('Food Delete successfully')
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <div className="min-h-screen bg-orange-50 flex flex-col font-sans">

            {/* --- Banner Section --- */}
            <div className="relative h-44 md:h-56 w-full bg-orange-200">
                <img
                    src={shopData?.image?.url}
                    alt="shop banner"
                    className="w-full h-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/40">
                    <div className="max-w-6xl mx-auto h-full w-full px-6 py-4 relative flex flex-col justify-end">

                        {/* Edit Button (Pen Icon) - Top Right */}
                        <button
                            onClick={() => navigate('/add-edit-shop')}
                            className="absolute cursor-pointer top-4 right-6 bg-white/20 hover:bg-white/40 backdrop-blur-md text-white p-2.5 rounded-full transition-all border border-white/30 shadow-lg active:scale-90"
                            title="Edit Shop Details"
                        >
                            <Pencil size={18} />
                        </button>

                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                            <div className="mb-2 md:mb-0">
                                <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-md uppercase font-bold mb-2 inline-block shadow-sm">
                                    Restaurant Partner
                                </span>
                                <h1 className="text-2xl md:text-4xl font-black text-white drop-shadow-lg tracking-tight">
                                    {shopData?.name}
                                </h1>
                                <div className="flex items-center gap-3 mt-1.5 text-gray-100 drop-shadow-sm text-sm opacity-90">
                                    <div className="flex items-center gap-1 font-medium">
                                        <MapPin size={14} className="text-orange-400" />
                                        <span>{shopData?.city}</span>
                                    </div>
                                    <span className="opacity-50">|</span>
                                    <p className="line-clamp-1 italic text-xs md:text-sm">{shopData?.address}</p>
                                </div>
                            </div>

                            {/* Add Button for Desktop */}
                            {items?.length > 0 && (
                                <button
                                    onClick={() => navigate('/add-edit-food')}
                                    className="bg-orange-500 cursor-pointer hover:bg-orange-600 text-white px-6 py-2.5 rounded-xl font-bold shadow-xl transition-all flex items-center gap-2 mb-1 active:scale-95"
                                >
                                    <Plus size={20} /> Add Food
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* --- Content Section --- */}
            <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full px-6 py-6">
                {
                    items && items.length > 0 ? (
                        <div className="w-full">
                            <div className="flex items-center justify-between mb-6 border-b pb-3 border-gray-200">
                                <h3 className="text-lg font-bold text-gray-800 uppercase tracking-wide">Menu Items</h3>
                                <div className="text-sm font-semibold px-3 py-1 bg-gray-200 text-gray-600 rounded-lg">
                                    {items.length} Total
                                </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {items.map((item) => (
                                    <div
                                        key={item._id}
                                        className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                                    >
                                        {/* Image Section */}
                                        <div className="relative h-48 w-full overflow-hidden">
                                            <img
                                                src={item.image.url}
                                                alt={item.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                            {/* Food Type Badge (Veg/Non-Veg) */}
                                            <div className="absolute top-3 left-3">
                                                <span className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-sm bg-white ${item.foodTypes === 'veg' ? 'text-green-600' : 'text-red-600'}`}>
                                                    <span className={`w-2 h-2 rounded-full ${item.foodTypes === 'veg' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                                                    {item.foodTypes}
                                                </span>
                                            </div>
                                            {/* Price Tag */}
                                            <div className="absolute bottom-3 right-3 bg-orange-500 text-white px-3 py-1 rounded-lg font-bold shadow-lg">
                                                ${item.price}
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="p-5">
                                            <div className="flex justify-between items-start mb-1">
                                                <h4 className="text-lg font-bold text-gray-800 truncate flex-1">
                                                    {item.name}
                                                </h4>
                                            </div>

                                            <p className="text-xs font-medium text-gray-400 uppercase tracking-widest mb-4">
                                                {item.category}
                                            </p>

                                            {/* Action Buttons */}
                                            <div className="flex items-center gap-3 border-t pt-4">
                                                <button
                                                    onClick={() => navigate('/add-edit-food', { state: { item } })}
                                                    className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-gray-50 hover:bg-orange-50 text-gray-600 hover:text-orange-600 py-2.5 rounded-xl text-sm font-bold transition-colors border border-gray-100"
                                                >
                                                    <Pencil size={16} /> Edit
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(item._id)}
                                                    className="flex-1 cursor-pointer flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-500 py-2.5 rounded-xl text-sm font-bold transition-colors border border-red-100"
                                                >
                                                    <Trash2 size={16} /> {`${itemLoading? 'Deleting ...' : 'Delete'}`}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Empty State */
                        <div className='flex-1 flex items-center justify-center py-10'>
                            <div className='bg-white p-8 rounded-4xl shadow-sm border border-orange-50 max-w-sm w-full flex flex-col items-center text-center'>
                                <div className='bg-orange-50 p-4 rounded-full mb-5 animate-pulse'>
                                    <UtensilsCrossed className='text-orange-500 size-8' />
                                </div>

                                <h2 className='text-xl font-extrabold text-gray-800 mb-2 tracking-tight'>Your kitchen is quiet!</h2>
                                <p className='text-sm text-gray-400 mb-6 leading-relaxed'>
                                    Time to spice things up. Add your first food item and let customers see what you're cooking!
                                </p>

                                <button
                                    onClick={() => navigate('/add-edit-food')}
                                    className='bg-orange-500 cursor-pointer hover:bg-orange-600 text-white font-black py-4 px-10 rounded-2xl transition-all w-full shadow-lg shadow-orange-100 active:scale-95 text-sm uppercase tracking-wider'
                                >
                                    Add Your First Food
                                </button>
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default OwnerHome