import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Circle, CircleCheckBig, Lock, MailIcon, PhoneCall, UserIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'
import VerifyOtp from '../components/VerifyOtp'
import { useDispatch, useSelector } from 'react-redux'
import { registration } from '../store/slice/authSlice'
import { toast } from 'react-toastify'

const Registration = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { loading } = useSelector((state) => state.auth)
    const [verified, setVerified] = useState(false)
    const [role, setRole] = useState('user')
    const [email, setEmail] = useState('')
    const {
        register,
        handleSubmit,
        watch,
        reset,
        formState: { errors }
    } = useForm()

    //password validation
    const passwordValue = watch("password", "");
    const alphabetValidate = /^(?=.*[a-zA-Z])/.test(passwordValue);
    const numberValidate = /^(?=.*\d)/.test(passwordValue);
    const lengthValidate = /^(?=.{8,})/.test(passwordValue);


    const onSubmit = async (data) => {
        data.role = role
        try {
            await dispatch(registration(data)).unwrap()
            reset()
            setEmail(data.email)
            setVerified(!verified)
            toast.success('Otp sended')
        } catch (error) {
            toast.error(error.message)
        }
    }

    return (
        <>
            {
                verified ? <VerifyOtp email={email} setVerified={setVerified} /> :
                    <div className='w-full bg-orange-50 flex items-center justify-center py-5 sm:py-10'>
                        <div className='bg-white shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col gap-2 max-w-md'>
                            <div>
                                <p className='text-3xl font-bold text-center text-orange-600'>Welcome to Food Bridge</p>
                                <p className='text-sm text-gray-500 text-center'>Create your account to get started with delicious food delivery</p>
                            </div>
                            <form onSubmit={handleSubmit(onSubmit)}
                                className='mt-4 flex flex-col gap-1 *:flex *:flex-col *:gap-1'>

                                {/* fullname */}
                                <div className='relative'>
                                    <label htmlFor="name">Full Name</label>
                                    <input
                                        type="text"
                                        className="border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-400 outline-none rounded-xl pr-2 pl-9 py-2"
                                        placeholder='Ex: Jhon Joe'
                                        {
                                        ...register('fullName', {
                                            required: 'user name is required'
                                        })
                                        }
                                        id="name"
                                    />
                                    <UserIcon className='absolute text-orange-500 left-2 bottom-2' />
                                </div>
                                <div>
                                    {
                                        errors.fullName && (
                                            <p className='text-red-600'>*{errors.fullName.message}</p>
                                        )
                                    }
                                </div>

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

                                {/* mobile number */}
                                <div className='relative'>
                                    <label htmlFor="mobile">Moile Number</label>
                                    <input
                                        type="text"
                                        id="mobile"
                                        placeholder='Enter your mobile number'
                                        className="border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-400 outline-none rounded-xl pr-2 pl-9 py-2"
                                        {
                                        ...register('mobile', {
                                            required: 'mobile number is required'
                                        })
                                        }
                                    />
                                    <PhoneCall className='absolute text-orange-500 left-2 bottom-1.5' />
                                </div>
                                <div>
                                    {
                                        errors.mobile && (
                                            <p className='text-red-600'>*{errors.mobile.message}</p>
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
                                            minLength: {
                                                value: 8,
                                                message: 'password must contain 8 characters'
                                            },
                                            pattern: {
                                                value: /^(?=.*\d)(?=.*[a-zA-Z])/,
                                                message: "password must include alphabet and number"
                                            }
                                        })
                                        }
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
                                {/* password validation */}
                                <div className='flex gap-1 flex-col *:flex *:gap-1 *:items-center'>
                                    <div className={`${alphabetValidate ? 'text-green-600' : 'text-black'}`}>
                                        <p>
                                            {alphabetValidate ? <CircleCheckBig className='size-4' /> : <Circle className='size-4' />}
                                        </p>
                                        <p>
                                            At least one Alphabet
                                        </p>
                                    </div>
                                    <div className={`${numberValidate ? 'text-green-600' : 'text-black'}`}>
                                        <p>
                                            {numberValidate ? <CircleCheckBig className='size-4' /> : <Circle className='size-4' />}
                                        </p>
                                        <p>
                                            At least one number
                                        </p>
                                    </div>
                                    <div className={`${lengthValidate ? 'text-green-600' : 'text-black'}`}>
                                        <p>
                                            {lengthValidate ? <CircleCheckBig className='size-4' /> : <Circle className='size-4' />}
                                        </p>
                                        <p>
                                            Minimum lenght 8 characters
                                        </p>
                                    </div>
                                </div>

                                {/* role */}
                                <div>
                                    <label htmlFor="role" className='font-semibold'>Role</label>
                                    <div className='grid grid-cols-3 gap-0.5 sm:gap-2 w-full'>
                                        {
                                            ['user', 'owner', 'deliveryBoy'].map((r, idx) => (
                                                <p
                                                    key={idx}
                                                    onClick={() => setRole(r)}
                                                    className={`${role === r ?
                                                        'bg-orange-600 text-white shadow-md' :
                                                        'border border-orange-500 text-orange-600 hover:bg-orange-50'}
                                                        cursor-pointer px-2 py-1 rounded-xl text-center transition`}
                                                >{r}
                                                </p>
                                            ))
                                        }
                                    </div>
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
                                            <p>Signing Up...</p>
                                        </div>
                                    ) : (
                                        "Sign Up"
                                    )}
                                </button>
                            </form>
                            <p className='text-center'>Already have an account?
                                <span className='text-blue-600 hover:underline cursor-pointer' onClick={() => navigate('/login')}> Sign in</span>
                            </p>
                        </div>
                    </div>
            }
        </>
    )
}

export default Registration