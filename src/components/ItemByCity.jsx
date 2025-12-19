import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Eye, ArrowRight } from 'lucide-react';

const ItemByCity = () => {
    const navigate = useNavigate();
    const { itemsByCity } = useSelector((state) => state.shop);
    const { user } = useSelector((state) => state.auth)

    if (!itemsByCity || itemsByCity.length === 0) return null;

    const handleViewItems = () => {
        if (user) {
            navigate('/')
        } else {
            navigate('/login')
        }
    }

    const handleViewDetails = (itemId) => {
        if (user) {
            navigate('/')
        } else {
            navigate('/login')
        }
    }

    return (
        <div className="container mx-auto">
            <div className="flex justify-between items-center mb-6 px-1">
                <h2 className="text-2xl font-semibold text-gray-800">Suggested Food</h2>
                {itemsByCity.length > 10 && (
                    <button
                        onClick={handleViewItems}
                        className="text-orange-500 cursor-pointer text-sm font-bold flex items-center gap-1 hover:underline"
                    >
                        See All <ArrowRight size={14} />
                    </button>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Maximum 10 items slice kora hoyeche */}
                {itemsByCity.slice(0, 8).map((item) => (
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

            {/* Bottom See More Button - Mobile ba focus er jonno niche boro kore */}
            {itemsByCity.length > 10 && (
                <div className="mt-8 flex justify-center">
                    <button
                        onClick={handleViewItems}
                        className="flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-bold text-sm rounded-2xl hover:bg-gray-50 hover:border-orange-200 hover:text-orange-600 transition-all shadow-sm"
                    >
                        Explore More Items <ArrowRight size={16} />
                    </button>
                </div>
            )}
        </div>
    );
};

export default ItemByCity;