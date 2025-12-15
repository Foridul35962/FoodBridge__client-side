import { MailIcon } from 'lucide-react'
import React from 'react'

const ForgetPassDesign = () => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className='w-full bg-orange-50 flex items-center justify-center py-5 sm:py-10'>
            <div className='bg-white shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col gap-2 max-w-md'>
                <div className='flex flex-col gap-1'>
                    <p className="text-3xl font-bold text-center text-orange-600">
                        Forgot your password?
                    </p>
                    <p className="text-sm text-gray-500 text-center">
                        No worries! Enter your email and we’ll send you a link to reset your password.
                    </p>
                </div>

                <form onSubmit={handleSubmit}
                    className='mt-2 flex flex-col gap-1 *:flex *:flex-col *:gap-1'>

                    {/* email */}
                    <div className='relative'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder='Ex: example@mail.com'
                            className="border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-400 outline-none rounded-xl pr-2 pl-9 py-2"
                            required
                        />
                        <MailIcon className='absolute text-orange-500 left-2 bottom-2' />
                    </div>
                    <button
                        type='submit'
                        className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 my-2 cursor-pointer text-white font-semibold px-2 py-2 rounded-xl">
                        Send Otp
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassDesign