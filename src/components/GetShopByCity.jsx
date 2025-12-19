import React, { useEffect, useRef, useState } from 'react'
import { getShopsByCity } from '../store/slice/shopSlice'
import { useDispatch, useSelector } from 'react-redux'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
import { toast } from 'react-toastify'

const GetShopByCity = () => {
    const dispatch = useDispatch()
    const { allShopsByCity } = useSelector((state) => state.shop)
    const { city } = useSelector((state) => state.auth)
    const shopScrollRef = useRef()

    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    useEffect(() => {
        try {
            if (city) {
                dispatch(getShopsByCity(city))
            }
        } catch (error) {
            toast.error(error.message)
        }
    }, [city])

    const scrollHandle = (direction) => {
        if (shopScrollRef.current) {
            shopScrollRef.current.scrollBy({
                left: direction === 'left' ? -300 : 300,
                behavior: 'smooth'
            })
        }
    }

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - shopScrollRef.current.offsetLeft)
        setScrollLeft(shopScrollRef.current.scrollLeft)
    }

    const handleMouseLeaveOrUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - shopScrollRef.current.offsetLeft
        const walk = (x - startX) * 1.5
        shopScrollRef.current.scrollLeft = scrollLeft - walk
    }

    return (
        <>
            {
                allShopsByCity.length > 0 &&
                <div className='relative py-5'>
                    <h1 className='text-2xl font-semibold'>Best Shops In {city}</h1>
                    <div
                        ref={shopScrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeaveOrUp}
                        onMouseUp={handleMouseLeaveOrUp}
                        onMouseMove={handleMouseMove}
                        className={`flex gap-4 rounded-2xl overflow-x-auto scrollbar-hide py-4 cursor-grab active:cursor-grabbing select-none 
                ${isDragging ? 'scroll-auto' : 'scroll-smooth snap-x snap-mandatory'}`}
                    >
                        {allShopsByCity?.map((shop, idx) => (
                            <div
                                key={idx}
                                className='relative shrink-0 snap-center cursor-pointer group'
                            >
                                <div className="overflow-hidden rounded-2xl pointer-events-none">
                                    <img
                                        src={shop.image.url}
                                        className='size-46 object-cover transition-transform duration-300 group-hover:scale-110'
                                        alt='image'
                                    />
                                </div>

                                <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-end justify-center pb-2">
                                    <button className='bg-white/80 backdrop-blur-sm text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md'>
                                        {shop.name}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <CircleArrowLeft
                        onClick={() => scrollHandle('left')}
                        className='absolute top-1/2 -translate-y-1/2 left-2 bg-orange-500 size-10 rounded-full text-white cursor-pointer z-10 shadow-lg'
                    />
                    <CircleArrowRight
                        onClick={() => scrollHandle('right')}
                        className='absolute top-1/2 -translate-y-1/2 right-2 bg-orange-500 size-10 rounded-full text-white cursor-pointer z-10 shadow-lg'
                    />
                </div>
            }
        </>
    )
}

export default GetShopByCity