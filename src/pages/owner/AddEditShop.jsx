import { UtensilsCrossed } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addShop, editShop } from '../../store/slice/shopSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'

const AddEditShop = () => {
    const { shopData, shopLoading } = useSelector((state) => state.shop)
    const { address, state, city } = useSelector((state) => state.auth)
    const [name, setName] = useState(shopData?.name || '')
    const [image, setImage] = useState(shopData?.image?.url || '')
    const [Address, setAddress] = useState(shopData?.address || address)
    const [State, setState] = useState(shopData?.state || state)
    const [City, setCity] = useState(shopData?.city || city)
    const [showImage, setShowImage] = useState(null)

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const handleImage = (e) => {
        const file = e.target.files[0]
        setImage(file)
        setShowImage(URL.createObjectURL(file))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData()
            formData.append('name', name)
            formData.append('city', City)
            formData.append('state', State)
            formData.append('address', Address)
            if (image) {
                formData.append('image', image)
            }
            if (shopData) {
                await dispatch(editShop({ data: formData, shopId: shopData._id })).unwrap()
                toast.success('Shop Edit Successfully')
            } else {
                if (!image) {
                    return toast.warning('image is required')
                }
                await dispatch(addShop(formData)).unwrap()
                toast.success('Shop Created Successfully')
            }
            navigate('/')
        } catch (error) {
            console.log(error);

            toast.error(error.message)
        }
    }

    return (
        <div className="min-h-screen bg-orange-50 flex items-center justify-center p-6">
            <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
                {/* Header Section */}
                <div className="flex items-center gap-3 mb-8 border-b pb-4">
                    <div className="bg-orange-100 p-2 rounded-lg">
                        <UtensilsCrossed className="text-orange-500 size-8" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {shopData ? 'Edit Shop' : 'Add Shop'}
                    </h2>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                            Shop Name
                        </label>
                        <input
                            required
                            type="text"
                            value={name}
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            placeholder="Enter shop name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                        />
                    </div>

                    {/* Image Field */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-1">
                            Shop Image
                        </label>
                        <input
                            type="file"
                            name="image"
                            id="image"
                            accept='image/*'
                            onChange={handleImage}
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
                        />
                    </div>
                    {
                        showImage &&
                        <div>
                            <img src={showImage}
                                alt="image"
                                className='rounded-2xl w-full h-52 object-cover'
                            />
                        </div>
                    }

                    {/* Address Field */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1">
                            Address
                        </label>
                        <input
                            required
                            type="text"
                            value={Address}
                            onChange={(e) => setAddress(e.target.value)}
                            name="address"
                            id="address"
                            placeholder="Street address"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                        />
                    </div>

                    {/* City & State Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="city" className="block text-sm font-semibold text-gray-700 mb-1">
                                City
                            </label>
                            <input
                                required
                                type="text"
                                value={City}
                                onChange={(e) => setCity(e.target.value)}
                                name="city"
                                id="city"
                                placeholder="City"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="state" className="block text-sm font-semibold text-gray-700 mb-1">
                                State
                            </label>
                            <input
                                required
                                type="text"
                                value={State}
                                onChange={(e) => setState(e.target.value)}
                                name="state"
                                id="state"
                                placeholder="State"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                            />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={shopLoading}
                        type="submit"
                        className={`w-full mt-4 py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg transform
                            ${shopLoading
                                ? "bg-orange-400 cursor-not-allowed opacity-70"
                                : "bg-orange-500 hover:bg-orange-600 hover:-translate-y-0.5 active:scale-95 cursor-pointer"}`}
                    >
                        {shopLoading ? (
                            <div className='flex gap-2 items-center'>
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <p>{shopData ? 'Updating Shop...' : 'Creating Shop...'}</p>
                            </div>
                        ) : (
                            shopData ? 'Update Shop' : 'Create Shop'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddEditShop