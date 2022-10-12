import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from 'react-router-dom'
import { auth, getConfirmationCode } from './firebase'

const Login = () => {
    const [phone, setPhone] = useState("+79500424342")
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()
    const recaptchaVerifier = useRef<RecaptchaVerifier>(null)
    const loginBtn = useRef<HTMLButtonElement>(null)
    const reCaptcha = useRef<HTMLDivElement>(null)
    useEffect(() => {
        if (loading) {
            return
        }
        if (user) navigate("/profile")
    }, [user, loading])
    useEffect(()=>{
        if(!recaptchaVerifier.current) {
            if(!reCaptcha.current) return
            if(!loginBtn.current) return
            console.log("LOGIN BUTTON ", loginBtn.current)
            const rv = new RecaptchaVerifier(loginBtn.current, 
                {
                    'size': 'invisible',
                    'callback': async () => {
                        console.log("CAPTCHA SOLVED")
                        const confirmationResult = await signInWithPhoneNumber(auth, phone, rv)
                        console.log("CONFIRMATION RESULT", confirmationResult)
                        const result = await confirmationResult.confirm("123456")
                        console.log("RESULT ", result)
                    }
                }, 
                auth
            )
            rv.render()
        }
    }, [])
    return (
        <div className="login">
            <div className="login__container">
                <input
                    type="text"
                    className="login__textBox"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone"
                />
                <div ref={reCaptcha}>

                </div>
                <button
                    className="login__btn"
                    ref={ loginBtn }
                    // onClick={ handleSendCode }
                >
                    Send code
                </button>
            </div>
        </div>
    )
}

export default Login