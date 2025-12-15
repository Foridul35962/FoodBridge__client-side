import { Lock, MailIcon } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const Login = () => {

    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm()


    const onSubmit = (data) => {

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
                    
                    <button
                        type='submit'
                        className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 my-2 cursor-pointer text-white font-semibold px-2 py-2 rounded-xl">
                        Sign In
                    </button>
                    <button
                        className="border border-gray-300 hover:bg-gray-100 transition px-2 py-2 rounded-xl cursor-pointer">
                        Sign Up with Google
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