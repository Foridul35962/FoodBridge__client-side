import React, { useState } from 'react'
import ForgetPassDesign from '../components/ForgetPassDesign'
import VerifyOtp from '../components/VerifyOtp'
import ResetPass from '../components/ResetPass'

const ForgetPass = () => {
    const [email, setEmail] = useState('')
    const [verified, setVerified] = useState(false)
    return (
        <div>
            {
                !email ? <ForgetPassDesign setEmail={setEmail} /> :
                    (!verified ? <VerifyOtp email={email} setVerified={setVerified} /> :
                        <ResetPass email={email} />)
            }
        </div>
    )
}

export default ForgetPass