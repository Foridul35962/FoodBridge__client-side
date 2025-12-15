import { Circle, CircleCheckBig, Lock } from 'lucide-react'
import React from 'react'
import { useForm } from 'react-hook-form'

const ResetPass = ({ email }) => {

    const {
        register,
        watch,
        handleSubmit
    } = useForm()

    //password validation
    const passwordValue = watch("password", "");
    const alphabetValidate = /^(?=.*[a-zA-Z])/.test(passwordValue);
    const numberValidate = /^(?=.*\d)/.test(passwordValue);
    const lengthValidate = /^(?=.{8,})/.test(passwordValue);

    const onSubmit = (data) => {

    }

    return (
        <div className='w-full bg-orange-50 flex items-center justify-center py-5 sm:py-10'>
            <div className='bg-white shadow-2xl rounded-2xl p-6 sm:p-8 flex flex-col gap-2 max-w-md'>
                <div>
                    <p className='text-3xl font-bold text-center text-orange-600'>Reset your password</p>
                    <p className='text-sm text-gray-500 text-center'>Create a new password to secure your Food Bridge account.</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}
                    className='mt-4 flex flex-col gap-1 *:flex *:flex-col *:gap-1'>

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

                    <button
                        type='submit'
                        className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 my-2 cursor-pointer text-white font-semibold px-2 py-2 rounded-xl">
                        Reset Password
                    </button>
                </form>
            </div>
        </div>
    )
}

export default ResetPass