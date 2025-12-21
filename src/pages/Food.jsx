import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { getItemById } from '../store/slice/itemSlice'
import { ShoppingCartIcon, Plus, Minus, Clock1, StarIcon, Eye } from 'lucide-react'
import { useState } from 'react'
import Loading from '../components/Loading'
import { addToCart } from '../store/slice/cartSlice'

const Food = () => {
    const { foodId } = useParams()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { item, itemLoading } = useSelector((state) => state.item)
    const { itemsByCity } = useSelector((state) => state.shop)
    const { cartItems } = useSelector((state) => state.cart)
    const relatedItem = itemsByCity
        ?.filter((i) => (i.category === item?.category || i.name === item?.name) && i._id !== item?._id)
        .slice(0, 4)

    useEffect(() => {
        if (foodId) {
            dispatch(getItemById(foodId))
        }
    }, [dispatch, foodId])

    const handleQuantity = (type) => {
        if (type === 'inc') setQuantity(quantity + 1)
        else quantity > 1 && setQuantity(quantity - 1)
    }
    const [quantity, setQuantity] = useState(1)


    const handleAddToCart = (item) => {
        dispatch(addToCart({
            _id: item._id,
            name: item.name,
            image: item.image.url,
            foodTypes: item.foodTypes,
            price: item.price,
            category: item.category,
            shop: item.shop,
            quantity: quantity
        }))
    }

    const isInCart = cartItems.some((i) => i._id === item._id)

    return (
        <>
            {
                itemLoading ? <Loading /> :
                    <div className="max-w-6xl mx-auto px-4 py-8">
                        {/* --- Main Food Section --- */}
                        <div className="flex flex-col lg:flex-row gap-10 mb-16">

                            {/* Image Section */}
                            <div className="w-full lg:w-1/2">
                                <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white h-80 md:h-96">
                                    <img
                                        src={item?.image?.url}
                                        alt={item?.name}
                                        className="w-full h-full object-cover"
                                    />
                                    {/* Food Type Badge */}
                                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full flex items-center gap-2 font-bold text-[10px] shadow-sm ${item?.foodTypes === 'veg' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                                        <div className={`w-2 h-2 rounded-full ${item?.foodTypes === 'veg' ? 'bg-green-600' : 'bg-red-600'}`}></div>
                                        {item?.foodTypes?.toUpperCase()}
                                    </div>
                                </div>
                            </div>

                            {/* Info Section */}
                            <div className="w-full lg:w-1/2 flex flex-col justify-center">
                                <nav className="text-[12px] text-gray-400 mb-2 flex gap-2 uppercase tracking-tight">
                                    <Link to="/" className="hover:text-orange-500 transition-colors">Home</Link> / <span>{item?.category}</span>
                                </nav>

                                <h1 className="text-3xl font-extrabold text-gray-900 mb-3 tracking-tight">
                                    {item?.name}
                                </h1>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="flex items-center gap-1 bg-yellow-50 px-2 py-0.5 rounded-md">
                                        <StarIcon size={14} className="text-yellow-500 fill-yellow-500" />
                                        <span className="font-bold text-yellow-700 text-sm">4.8</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-gray-500 text-xs font-medium border-l pl-4">
                                        <Clock1 size={14} className="text-orange-500" />
                                        <span>20-30 Mins</span>
                                    </div>
                                </div>

                                <p className="text-gray-500 text-sm leading-relaxed mb-6 max-w-md">
                                    Experience the authentic flavors of our special {item?.name}.
                                    Crafted with premium ingredients for the best taste.
                                </p>

                                {/* Quantity & Price Row */}
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="flex items-center border border-gray-200 rounded-xl p-1 bg-gray-50">
                                        <button
                                            onClick={() => handleQuantity('dec')}
                                            className="p-2 hover:bg-white rounded-lg transition-all text-gray-500">
                                            <Minus size={16} />
                                        </button>
                                        <span className="w-8 text-center text-sm font-bold text-gray-800">{quantity}</span>
                                        <button
                                            onClick={() => handleQuantity('inc')}
                                            className="p-2 bg-white shadow-sm rounded-lg text-orange-500">
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <div className="text-2xl font-black text-gray-900">
                                        ${(item?.price * quantity).toFixed(2)}
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleAddToCart(item)}
                                    className={`w-full md:w-max px-8 py-3.5 rounded-xl font-bold cursor-pointer text-sm flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-lg 
                                        ${!isInCart ? 'bg-orange-500 hover:bg-orange-600 shadow-orange-200' : 'bg-gray-800 hover:bg-black shadow-gray-200'} text-white`}>
                                    <ShoppingCartIcon size={18} />
                                    {isInCart ? 'Added In Cart' : 'Add to Cart'}
                                </button>
                            </div>
                        </div>

                        {/* --- Related Items Section --- */}
                        {relatedItem?.length > 0 && (
                            <div className="border-t pt-12">
                                <div className="flex justify-between items-end mb-8">
                                    <div>
                                        <h2 className="text-xl font-bold text-gray-800 tracking-tight">You Might Also Like</h2>
                                        <p className="text-gray-400 text-xs mt-1">Similar items from {item?.category}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {relatedItem.map((item) => (
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
                                                        onClick={() => navigate(`/food/${item._id}`)}
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
                        )}
                    </div>}
        </>
    )
}

export default Food