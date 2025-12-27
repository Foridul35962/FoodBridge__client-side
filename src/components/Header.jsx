import React, { useEffect, useRef, useState } from 'react'
import { LogOut, MapPin, Plus, Search, ShoppingBag, ShoppingCart, User, X } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout, setCity } from '../store/slice/authSlice'
import { toast } from 'react-toastify'

const Header = () => {
    const { user, city } = useSelector(state => state.auth)
    const { shopLoading, shopData } = useSelector((state) => state.shop)
    const { cartItems } = useSelector((state) => state.cart)

    const [showSearch, setShowSearch] = useState(false)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [showUserMenu, setShowUserMenu] = useState(false)
    const [showLocationMenu, setShowLocationMenu] = useState(false)

    const handleSetLocation = (e) => {
        e.preventDefault()
        const city = e.target.city.value
        dispatch(setCity(city))
        setShowLocationMenu(false)
    }


    const menuRef = useRef(null)

    // Close popup on outside click
    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setShowUserMenu(false)
            }
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleAvatar = () => {
        if (user) {
            setShowUserMenu(!showUserMenu)
        } else {
            navigate('/login')
        }
    }

    const handleLogout = async () => {
        try {
            await dispatch(logout()).unwrap()
            navigate('/')
            toast.success('Logout successfully')
        } catch (error) {
            toast.error(error.message)
        }
    }

    const [searchItem, setSerchItem] = useState('')
    const handleSearch = () => {
        if (searchItem.trim()) {
            navigate(`/all-foods/all?search=${searchItem}`)
        } else {
            navigate(`/all-foods/all`)
        }
    }

    return (
        <>
            <div>
                {/* Top Header */}
                <div className="w-full bg-[#fff7f2] shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">

                        {/* Logo */}
                        <div onClick={() => navigate('/')} className="text-xl sm:text-2xl cursor-pointer font-bold text-orange-600">
                            FoodBridge
                        </div>

                        {/* Search Bar (Desktop) */}
                        {
                            user?.role === 'user' &&
                            <div className="hidden sm:flex items-center w-1/2 bg-white rounded-md shadow px-3 py-2 gap-2">
                                <div onClick={() => setShowLocationMenu(true)} title='set location' className="flex cursor-pointer items-center gap-1 text-gray-500 text-sm pr-3 border-r">
                                    <MapPin size={16} className="text-orange-500" />
                                    {city}
                                </div>

                                <Search size={16} className="text-gray-400" />
                                <input
                                    type="text"
                                    value={searchItem}
                                    onChange={(e) => setSerchItem(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                    placeholder="search delicious food..."
                                    className="w-full outline-none text-sm"
                                />
                            </div>
                        }

                        {/* Right Section */}
                        <div className="flex items-center gap-4">

                            {/* Cart */}
                            {
                                user?.role === 'user' &&
                                <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
                                    <ShoppingCart className="text-orange-500 size-7" />
                                    <span
                                        className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                        {cartItems.length}
                                    </span>
                                </div>
                            }

                            {/* add items */}
                            {
                                user?.role === 'owner' && !shopLoading && shopData &&
                                <div
                                    onClick={() => navigate('/add-edit-food')}
                                    className='flex gap-1 bg-orange-500 hover:bg-orange-600 active:bg-orange-700 transition-all duration-300 text-white text-sm items-center rounded-2xl p-1 sm:px-2 sm:py-1 cursor-pointer'>
                                    <Plus />
                                    <p className='hidden sm:block'>Add Item</p>
                                </div>
                            }

                            {/* Orders */}
                            <div
                                onClick={() => navigate('/my-orders')}
                                className={`cursor-pointer hidden sm:block ${!user && 'hidden'}`}>
                                <ShoppingBag className='size-5 text-orange-500' />
                            </div>

                            {/* Mobile Search Toggle */}
                            <button
                                onClick={() => setShowSearch(true)}
                                className="sm:hidden"
                            >
                                <Search className="text-orange-500" size={22} />
                            </button>

                            {/* Avatar */}
                            <div className="relative" ref={menuRef}>
                                <div
                                    onClick={handleAvatar}
                                    className="w-8 h-8 bg-orange-500 hover:bg-orange-600 transition-all duration-300 text-white rounded-full flex items-center justify-center text-sm font-semibold cursor-pointer select-none"
                                >
                                    {user?.fullName ? (user.fullName.split(" ").slice(0, 2).map(w => w[0]).join("")) : 'A'}
                                </div>

                                {/* Popup Menu */}
                                {
                                    showUserMenu && user && (
                                        <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border z-50 overflow-hidden">
                                            <div className="px-4 py-3 border-b">
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {user?.fullName}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Welcome back 👋
                                                </p>
                                            </div>

                                            <div className="py-2">
                                                {
                                                    <button
                                                        onClick={() => navigate('/my-orders')}
                                                        className="w-full sm:hidden flex items-center gap-2 px-4 py-2 text-sm hover:bg-orange-50 text-gray-700">
                                                        <ShoppingBag size={16} />
                                                        My Orders
                                                    </button>
                                                }

                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex cursor-pointer items-center gap-2 px-4 py-2 text-sm hover:bg-red-50 text-red-500">
                                                    <LogOut size={16} />
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>

                        </div>
                    </div>
                </div>

                {/* Mobile Search */}
                {showSearch && (
                    <div className="sm:hidden bg-[#fff7f2] px-4 pb-2 shadow-md">
                        <div className="flex items-center bg-white rounded-md px-3 py-2 gap-2">
                            <MapPin className="text-orange-500 size-6" onClick={() => setShowLocationMenu(true)} />
                            <span className="text-sm text-gray-500" onClick={() => setShowLocationMenu(true)}>{city}</span>

                            <span className="mx-2 text-gray-300">|</span>

                            <Search size={16} className="text-gray-400" />
                            <input
                                type="text"
                                value={searchItem}
                                onChange={(e) => setSerchItem(e.target.value)}
                                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                                placeholder="search delicious food..."
                                className="w-full outline-none text-sm"
                            />

                            <X
                                onClick={() => setShowSearch(false)}
                                className="text-orange-500 cursor-pointer"
                                size={18}
                            />
                        </div>
                    </div>
                )}

                {/* Popup Menu */}
                {showLocationMenu && (
                    <div className="absolute left-8 mt-3 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in duration-200">
                        <div className="p-4 relative">
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Enter Location</h3>
                            <form onSubmit={handleSetLocation} className="flex flex-col gap-3">
                                <input
                                    type="text"
                                    placeholder="Enter City"
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
                                    name="city"
                                    autoFocus
                                />
                                <button
                                    type="submit"
                                    className="w-full bg-orange-500 hover:bg-orange-600 text-white text-sm font-medium py-2 rounded-md transition-colors duration-200 shadow-md active:scale-95"
                                >
                                    Set Location
                                </button>
                            </form>
                            <X
                                onClick={() => setShowLocationMenu(false)}
                                className="text-orange-500 absolute right-4 top-4 cursor-pointer"
                                size={20}
                            />
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}

export default Header
