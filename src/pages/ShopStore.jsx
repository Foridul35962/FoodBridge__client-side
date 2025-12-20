import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getShopItems } from '../store/slice/shopSlice'
import Loading from '../components/Loading'
import NoShopFound from '../components/pages/NoShopFound'
import { Eye, MapPin } from 'lucide-react'
import NoFoodInRestaurant from '../components/pages/NoFoodInRestaurant'

const ShopStore = () => {
    const { shopLoading, shopData, shopItems } = useSelector((state) => state.shop)
    const { shopId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        const getShopDataItems = async () => {
            await dispatch(getShopItems(shopId)).unwrap()
        }
        getShopDataItems()
    }, [])

    return (
        <>
            {
                shopLoading ? <Loading /> : !shopData ? <NoShopFound /> :
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

                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* --- Content Section --- */}
                        {
                            !shopItems ? <NoFoodInRestaurant /> :
                                <div className='flex flex-col gap-3 p-6 sm:px-14'>
                                    <p className='text-3xl font-semibold text-orange-500'>All Items In Restaurant</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                        {shopItems.map((item) => (
                                            <div
                                                key={item._id}
                                                className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 group"
                                            >
                                                {/* Image Section */}
                                                <div className="relative h-40 w-full overflow-hidden">
                                                    <img
                                                        src={item.image.url}
                                                        alt={item.name}
                                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    />

                                                    <div className="absolute top-2 left-2">
                                                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider shadow-sm bg-white/90 backdrop-blur-sm ${item.foodTypes === 'veg' ? 'text-green-600' : 'text-red-600'}`}>
                                                            <span className={`w-1.5 h-1.5 rounded-full ${item.foodTypes === 'veg' ? 'bg-green-600' : 'bg-red-600'}`}></span>
                                                            {item.foodTypes}
                                                        </span>
                                                    </div>

                                                    <div className="absolute bottom-2 right-2 bg-orange-500 text-white px-2 py-0.5 rounded-lg text-xs font-bold shadow-md">
                                                        <span className='text-lg'>৳ </span>{item.price}
                                                    </div>
                                                </div>

                                                {/* Content Section */}
                                                <div className="p-3">
                                                    <h4 className="text-sm font-bold text-gray-800 truncate">
                                                        {item.name}
                                                    </h4>
                                                    <p className="text-[10px] font-medium text-gray-400 uppercase tracking-widest mb-3">
                                                        {item.category}
                                                    </p>

                                                    <div className="border-t pt-3">
                                                        <button
                                                            onClick={()=>navigate(`/food/${item._id}`)}
                                                            className="w-full cursor-pointer flex items-center justify-center gap-2 bg-gray-50 hover:bg-orange-50 text-gray-600 hover:text-orange-600 py-1.5 rounded-xl text-xs font-bold transition-colors border border-gray-100"
                                                        >
                                                            <Eye size={14} /> View Details
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                        }

                    </div>
            }
        </>
    )
}

export default ShopStore