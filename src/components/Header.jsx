import React, { useEffect, useRef, useState } from 'react'
import { LogOut, MapPin, Search, ShoppingBag, ShoppingCart, User, X } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const Header = () => {
    const { user, city } = useSelector(state => state.auth)
    const [showSearch, setShowSearch] = useState(false)
    const navigate = useNavigate()

    const [showUserMenu, setShowUserMenu] = useState(false)

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

    const handleAvatar = ()=>{
        if (user) {
            setShowUserMenu(!showUserMenu)
        }else{
            navigate('/login')
        }
    }

    return (
        <>
            <div>
                {/* Top Header */}
                <div className="w-full bg-[#fff7f2] shadow-sm">
                    <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">

                        {/* Logo */}
                        <div onClick={()=>navigate('/')} className="text-xl cursor-pointer font-bold text-orange-600">
                            FoodBridge
                        </div>

                        {/* Search Bar (Desktop) */}
                        <div className="hidden sm:flex items-center w-1/2 bg-white rounded-md shadow px-3 py-2 gap-2">
                            <div className="flex items-center gap-1 text-gray-500 text-sm pr-3 border-r">
                                <MapPin size={16} className="text-orange-500" />
                                {city}
                            </div>

                            <Search size={16} className="text-gray-400" />
                            <input
                                type="text"
                                placeholder="search delicious food..."
                                className="w-full outline-none text-sm"
                            />
                        </div>

                        {/* Right Section */}
                        <div className="flex items-center gap-4">

                            {/* Cart */}
                            <div className="relative cursor-pointer">
                                <ShoppingCart className="text-orange-500 size-7" />
                                <span class
                                    className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                                    0
                                </span>
                            </div>

                            {/* Orders */}
                            {user && <div className="hidden sm:block text-sm text-orange-500 font-medium cursor-pointer">
                                My Orders
                            </div>}

                            {/* Avatar */}
                            <div className="relative" ref={menuRef}>
                                <div
                                    onClick={handleAvatar}
                                    className="w-8 h-8 bg-orange-500 text-white rounded-full flex items-center justify-center text-sm font-semibold cursor-pointer select-none"
                                >
                                    {user?.fullName?.slice(0, 1) || 'A'}
                                </div>

                                {/* Popup Menu */}
                                {
                                    showUserMenu && user && (
                                        <div className="absolute right-0 mt-3 w-48 bg-white rounded-lg shadow-lg border z-50 overflow-hidden">
                                            <div className="px-4 py-3 border-b">
                                                <p className="text-sm font-semibold text-gray-800">
                                                    {user.fullName}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Welcome back 👋
                                                </p>
                                            </div>

                                            <div className="py-2">
                                                <button className="w-full sm:hidden flex items-center gap-2 px-4 py-2 text-sm hover:bg-orange-50 text-gray-700">
                                                    <ShoppingBag size={16} />
                                                    My Orders
                                                </button>

                                                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-orange-50 text-gray-700">
                                                    <User size={16} />
                                                    Profile
                                                </button>

                                                <button className="w-full flex items-center gap-2 px-4 py-2 text-sm hover:bg-red-50 text-red-500">
                                                    <LogOut size={16} />
                                                    Logout
                                                </button>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>


                            {/* Mobile Search Toggle */}
                            <button
                                onClick={() => setShowSearch(true)}
                                className="sm:hidden"
                            >
                                <Search className="text-orange-500" size={22} />
                            </button>

                        </div>
                    </div>
                </div>

                {/* Mobile Search */}
                {showSearch && (
                    <div className="sm:hidden bg-[#fff7f2] px-4 pb-2 shadow-md">
                        <div className="flex items-center bg-white rounded-md px-3 py-2 gap-2">
                            <MapPin className="text-orange-500 size-6" />
                            <span className="text-sm text-gray-500">{city}</span>

                            <span className="mx-2 text-gray-300">|</span>

                            <Search size={16} className="text-gray-400" />
                            <input
                                type="text"
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
            </div>
        </>
    )
}

export default Header
