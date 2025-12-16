import { MailIcon } from 'lucide-react'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { forgetPassword } from '../store/slice/authSlice'
import { toast } from 'react-toastify'

const ForgetPassDesign = ({ setEmail }) => {

    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)
    const handleSubmit = async (e) => {
        e.preventDefault()
        const data = {
            email : e.target.email.value
        }
        try {
            await dispatch(forgetPassword(data)).unwrap()
            setEmail(data.email)
        } catch (error) {
            toast.error(error.message)
        }
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
                            name='email'
                            placeholder='Ex: example@mail.com'
                            className="border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-400 outline-none rounded-xl pr-2 pl-9 py-2"
                            required
                        />
                        <MailIcon className='absolute text-orange-500 left-2 bottom-2' />
                    </div>
                    <button
                        disabled={loading}
                        type="submit"
                        className={`my-2 px-4 py-2 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300
                            ${loading ? "bg-orange-400 cursor-not-allowed opacity-70" : "bg-orange-600 hover:bg-orange-700 cursor-pointer"}`}
                    >
                        {loading ? (
                            <div className='flex gap-1 items-center'>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <p>Sending Otp...</p>
                            </div>
                        ) : (
                            "Send Otp"
                        )}
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ForgetPassDesign