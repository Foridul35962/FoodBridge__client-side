import { UtensilsCrossed } from 'lucide-react'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'

const AddEditShop = () => {
    const { shopData } = useSelector((state) => state.shop)
    const { address, state, city } = useSelector((state) => state.auth)
    const [name, setName] = useState(shopData?.name || '')
    const [image, setImage] = useState(shopData?.image?.url || '')
    const [Address, setAddress] = useState(shopData?.address || address)
    const [State, SetState] = useState(shopData?.state || state)
    const [City, SetCity] = useState(shopData?.city || city)
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

                <form className="space-y-5">
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                            Shop Name
                        </label>
                        <input
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
                            className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-700 hover:file:bg-orange-100 cursor-pointer"
                        />
                    </div>

                    {/* Address Field */}
                    <div>
                        <label htmlFor="address" className="block text-sm font-semibold text-gray-700 mb-1">
                            Address
                        </label>
                        <input
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
                        type="submit"
                        className="w-full mt-4 cursor-pointer bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg shadow-lg transform transition hover:-translate-y-0.5 active:scale-95"
                    >
                        {shopData ? 'Update Shop' : 'Create Shop'}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddEditShop