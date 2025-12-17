import { Lock, MailIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { login } from '../store/slice/authSlice'
import { toast } from 'react-toastify'

const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors }
    } = useForm()


    const onSubmit = async (data) => {        
        try {
            await dispatch(login(data)).unwrap()
            navigate('/')            
            toast.success('login successfully')
            reset()
        } catch (error) {
            toast.error(error.message)
        }
    }


    return (
        <div className='w-full bg-orange-50 flex items-center justify-center py-5 sm:py-10'>
            <div className='bg-white shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col gap-2 max-w-md'>
                <div>
                    <p className='text-3xl font-bold text-center text-orange-600'>Welcome to Food Bridge</p>
                    <p className='text-sm text-gray-500 text-center'>Sign in your account to get started with delicious food delivery</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}
                    className='mt-4 flex flex-col gap-1 *:flex *:flex-col *:gap-1'>

                    {/* email */}
                    <div className='relative'>
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder='Ex: example@mail.com'
                            className="border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-400 outline-none rounded-xl pr-2 pl-9 py-2"
                            {
                            ...register('email', {
                                required: 'email is required'
                            })
                            }
                        />
                        <MailIcon className='absolute text-orange-500 left-2 bottom-1.5' />
                    </div>
                    <div>
                        {
                            errors.email && (
                                <p className='text-red-600'>*{errors.email.message}</p>
                            )
                        }
                    </div>

                    {/* password */}
                    <div className='relative'>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder='Enter your password'
                            className="border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-400 outline-none rounded-xl pr-2 pl-9 py-2"
                            {
                            ...register('password', {
                                required: 'password is required',
                            })}
                        />
                        <Lock className='absolute text-orange-600 left-2 bottom-2' />
                    </div>
                    <div>
                        {
                            errors.password && (
                                <p className='text-red-600'>*{errors.password.message}</p>
                            )
                        }
                    </div>

                    <p onClick={() => navigate('/forget-pass')} className='text-blue-600 hover:underline text-end cursor-pointer'>forget-password?</p>

                    <button
                        disabled={loading}
                        type="submit"
                        className={`my-2 px-4 py-2 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300
                            ${loading ? "bg-orange-400 cursor-not-allowed opacity-70" : "bg-orange-600 hover:bg-orange-700 cursor-pointer"}`}
                    >
                        {loading ? (
                            <div className='flex gap-1 items-center'>
                                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                <p>Signing In...</p>
                            </div>
                        ) : (
                            "Sign In"
                        )}
                    </button>

                </form>
                <p className='text-center'>Don't have any account?
                    <span className='text-blue-600 hover:underline cursor-pointer' onClick={() => navigate('/registration')}> Sign up</span>
                </p>
            </div>
        </div>
    )
}

export default Login