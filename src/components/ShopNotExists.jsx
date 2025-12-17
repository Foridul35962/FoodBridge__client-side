import { UtensilsCrossed } from 'lucide-react'

const ShopNotExists = () => {
    return (
        <div className='w-full min-h-screen p-5 bg-orange-50 flex items-center justify-center'>
            <div className='rounded-3xl shadow-xl bg-white p-8 max-w-md flex flex-col items-center gap-6 text-center border border-orange-100'>

                {/* Icon with background for a better look */}
                <div className='bg-orange-100 p-4 rounded-full'>
                    <UtensilsCrossed className='text-orange-500 size-10' />
                </div>

                <div className='flex flex-col gap-2'>
                    <h2 className='text-3xl font-extrabold text-gray-800'>Add Your Restaurant</h2>
                    <p className='text-gray-500 leading-relaxed'>
                        Join our food delivery platform and reach thousands of hungry customers every day.
                    </p>
                </div>

                <button
                    className='bg-orange-500 hover:bg-orange-600 text-white font-semibold px-8 py-3 rounded-xl transition-all duration-300 w-full shadow-lg shadow-orange-200 active:scale-95 cursor-pointer'
                >
                    Get Started
                </button>
            </div>
        </div>
    )
}

export default ShopNotExists