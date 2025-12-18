import { UtensilsCrossed } from 'lucide-react'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { addItem, editItem } from '../../store/slice/itemSlice'

const AddEditFood = () => {

    const location = useLocation()
    const item = location.state?.item || null;

    const { itemLoading } = useSelector((state) => state.item)
    const [name, setName] = useState(item?.name || '')
    const [category, setCategory] = useState(item?.category || '')
    const [price, setPrice] = useState(item?.price || '')
    const [foodTypes, setFoodTypes] = useState(item?.foodTypes || '')
    const [image, setImage] = useState(item?.image?.url || '')
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
            formData.append('category', category)
            formData.append('price', price)
            formData.append('foodTypes', foodTypes)
            if (image !== item?.image?.url) {
                formData.append('image', image)
            }
            if (item) {
                await dispatch(editItem({ data: formData, itemId: item._id })).unwrap()
                toast.success('Food Update Successfully')
            } else {
                if (!image) {
                    return toast.warning('image is required')
                }
                await dispatch(addItem(formData)).unwrap()
                toast.success('Food Add Successfully')
            }
            navigate('/')
        } catch (error) {
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
                        {item ? 'Edit Food' : 'Add Food'}
                    </h2>
                </div>

                <form className="space-y-5" onSubmit={handleSubmit}>
                    {/* Name Field */}
                    <div>
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1">
                            Food Name
                        </label>
                        <input
                            required
                            type="text"
                            value={name}
                            name="name"
                            onChange={(e) => setName(e.target.value)}
                            id="name"
                            placeholder="Enter Food Name"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                        />
                    </div>

                    {/* Image Field */}
                    <div>
                        <label htmlFor="image" className="block text-sm font-semibold text-gray-700 mb-1">
                            Food Image
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
                        (showImage || image) &&
                        <div>
                            <img src={`${showImage? showImage : image}`}
                                alt="image"
                                className='rounded-2xl w-full h-52 object-cover'
                            />
                        </div>
                    }

                    {/* Category Field */}
                    <div>
                        <label htmlFor="category" className="block text-sm font-semibold text-gray-700 mb-1">
                            Category
                        </label>
                        <input
                            required
                            type="text"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            name="category"
                            id="category"
                            placeholder="Enter Category"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                        />
                    </div>

                    {/* price & State Row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="price" className="block text-sm font-semibold text-gray-700 mb-1">
                                Price
                            </label>
                            <input
                                required
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                name="price"
                                id="price"
                                placeholder="price"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label htmlFor="foodTypes" className="block text-sm font-semibold text-gray-700 mb-1">
                                FoodTypes
                            </label>
                            <select
                                name="foodTypes"
                                id="foodTypes"
                                required
                                value={foodTypes}
                                onChange={(e) => setFoodTypes(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none transition-all"
                            >
                                <option value="" disabled>Select Type</option>
                                <option value="veg">🟢 Veg</option>
                                <option value="non veg">🔴 Non Veg</option>
                            </select>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        disabled={itemLoading}
                        type="submit"
                        className={`w-full mt-4 py-3 rounded-lg font-bold text-white flex items-center justify-center gap-2 transition-all duration-300 shadow-lg transform
                            ${itemLoading
                                ? "bg-orange-400 cursor-not-allowed opacity-70"
                                : "bg-orange-500 hover:bg-orange-600 hover:-translate-y-0.5 active:scale-95 cursor-pointer"}`}
                    >
                        {itemLoading ? (
                            <div className='flex gap-2 items-center'>
                                <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <p>{item ? 'Updating Food...' : 'Add Food...'}</p>
                            </div>
                        ) : (
                            item ? 'Update Food' : 'Add Food'
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default AddEditFood