import { ShieldCheck } from 'lucide-react'

const VerifyOtp = ({ email, setVerified }) => {

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return (
        <div className="w-full min-h-screen bg-orange-50 flex items-center justify-center px-4">
            <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8 flex flex-col gap-4 max-w-md w-full">

                {/* Header */}
                <div className="text-center space-y-1">
                    <p className="text-3xl font-bold text-orange-600">
                        Verify your email
                    </p>
                    <p className="text-sm text-gray-500">
                        We’ve sent a 6-digit OTP to
                    </p>
                    <p className="text-sm font-semibold text-gray-700 break-all">
                        {email}
                    </p>
                </div>

                {/* Form */}
                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-3"
                >

                    {/* OTP Input */}
                    <div className="relative">
                        <label htmlFor="otp" className="text-sm font-medium text-gray-700">
                            One Time Password
                        </label>

                        <input
                            type="text"
                            id="otp"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="● ● ● ● ● ●"
                            className="w-full border border-gray-300 focus:border-orange-500 focus:ring-1 focus:ring-orange-400 outline-none rounded-xl pl-6 pr-3 py-3 text-center tracking-widest font-semibold text-lg"
                            required
                        />

                        {/* OTP Icon */}
                        <ShieldCheck
                            className="absolute left-3 bottom-3 text-orange-500 size-7"
                        />
                    </div>

                    {/* Verify Button */}
                    <button
                        type="submit"
                        className="bg-orange-600 hover:bg-orange-700 transition-all duration-300 cursor-pointer text-white font-semibold py-3 rounded-xl"
                    >
                        Verify Email
                    </button>
                </form>
            </div>
        </div>

    )
}

export default VerifyOtp