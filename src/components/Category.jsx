import React, { useEffect, useRef, useState } from 'react'
import { getAllItem } from '../store/slice/itemSlice'
import { useDispatch, useSelector } from 'react-redux'
import { CircleArrowLeft, CircleArrowRight } from 'lucide-react'
import Loading from './Loading'
import { useNavigate } from 'react-router-dom'

const Category = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {user} = useSelector((state)=>state.auth)
    const { uniqueCategoryItems } = useSelector((state) => state.item)
    const cateScrollRef = useRef()

    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState(0)
    const [scrollLeft, setScrollLeft] = useState(0)

    useEffect(() => {
        dispatch(getAllItem())
    }, [])

    const scrollHandle = (direction) => {
        if (cateScrollRef.current) {
            cateScrollRef.current.scrollBy({
                left: direction === 'left' ? -300 : 300,
                behavior: 'smooth'
            })
        }
    }

    const handleMouseDown = (e) => {
        setIsDragging(true)
        setStartX(e.pageX - cateScrollRef.current.offsetLeft)
        setScrollLeft(cateScrollRef.current.scrollLeft)
    }

    const handleMouseLeaveOrUp = () => {
        setIsDragging(false)
    }

    const handleMouseMove = (e) => {
        if (!isDragging) return
        e.preventDefault()
        const x = e.pageX - cateScrollRef.current.offsetLeft
        const walk = (x - startX) * 1.5
        cateScrollRef.current.scrollLeft = scrollLeft - walk
    }

    const handleViewCategory = (categoryId)=>{
        if (user) {
            navigate(`/categories/${categoryId}`)
        } else {
            navigate('/login')
        }
    }

    return (
        <>
            {
                !uniqueCategoryItems.length > 0 ? <Loading /> :
                <div className='relative py-5'>
                    <h1 className='text-2xl font-semibold'>Insperition For Your Order</h1>
                    <div
                        ref={cateScrollRef}
                        onMouseDown={handleMouseDown}
                        onMouseLeave={handleMouseLeaveOrUp}
                        onMouseUp={handleMouseLeaveOrUp}
                        onMouseMove={handleMouseMove}
                        className={`flex gap-4 rounded-2xl overflow-x-auto scrollbar-hide py-4 cursor-grab active:cursor-grabbing select-none 
                ${isDragging ? 'scroll-auto' : 'scroll-smooth snap-x snap-mandatory'}`}
                    >
                        {uniqueCategoryItems?.map((item, idx) => (
                            <div
                                key={idx}
                                onClick={()=>handleViewCategory(item.category)}
                                className='relative shrink-0 snap-center cursor-pointer group'
                            >
                                <div className="overflow-hidden rounded-2xl pointer-events-none">
                                    <img
                                        src={item.image.url}
                                        className='size-46 object-cover transition-transform duration-300 group-hover:scale-110'
                                        alt={item.category}
                                    />
                                </div>

                                <div className="absolute inset-0 bg-black/20 rounded-2xl flex items-end justify-center pb-2">
                                    <button className='bg-white/80 backdrop-blur-sm text-black text-xs font-semibold px-3 py-1 rounded-full shadow-md'>
                                        {item.category}
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

export default Category