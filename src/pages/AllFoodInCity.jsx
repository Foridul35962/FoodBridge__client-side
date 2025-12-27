import { Eye } from 'lucide-react';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { searchItems } from '../store/slice/itemSlice';
import Loading from '../components/Loading';

const AllFoodInCity = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams()
    const dispatch = useDispatch()
    const { city, user } = useSelector(state => state.auth)
    const { searchItem, itemLoading } = useSelector(state => state.item)

    const queryParams = Object.fromEntries([...searchParams])

    useEffect(() => {
        if (city) {
            dispatch(searchItems({
                city,
                ...queryParams
            }))
        }
    }, [dispatch, city, searchParams])

    const handleViewDetails = (itemId) => {
        if (user) {
            navigate(`/food/${itemId}`)
        } else {
            navigate('/login')
        }
    }


    return (
        <>
            {
                itemLoading ? <Loading /> :
                    <div className="flex flex-col gap-3 p-6 sm:px-14">
                        <h1 className='text-3xl font-semibold text-orange-500'>Here All Foods In Your City</h1>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                            {searchItem.map((item) => (
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
                                                onClick={() => handleViewDetails(item._id)}
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
        </>
    )
}

export default AllFoodInCity