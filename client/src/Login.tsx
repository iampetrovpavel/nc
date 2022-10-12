import { RecaptchaVerifier, signInWithPhoneNumber, PhoneAuthProvider, ConfirmationResult } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from 'react-router-dom'
import { loginUser } from './api/user';
import { auth } from './firebase'

//+358415708221

let confirmationResult: ConfirmationResult | null = null
let recaptchaVerifier: any = null

const Login = () => {
    const [phone, setPhone] = useState("+79500424342")
    const [code, setCode] = useState("123456")
    const [verified, setVerified] = useState(false)
    const [user, loading, error] = useAuthState(auth)
    const navigate = useNavigate()
    const loginBtn = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        if (loading) {
            return
        }
        if (user) navigate("/profile")
    }, [user, loading, navigate])

    async function signUp(){
        console.log("RECAPTCHA VERIFER", recaptchaVerifier)
        console.log("PHONE ", phone)
        confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier)
    }

    useEffect(()=>{
        if(!verified)return
        signUp()
    }, [verified])

    async function initCaptcha() {
        if(!loginBtn.current) return
        recaptchaVerifier = new RecaptchaVerifier(loginBtn.current, 
            {
                'size': 'invisible',
                'callback': async () => { setVerified(true) }
            }, 
            auth
        )
        recaptchaVerifier.render()
    }

    useEffect(()=>{
        initCaptcha()
    }, [])
    async function handleConfirm() {
        if(!code || code.length !== 6) return alert("Code not valid")
        if(!confirmationResult) return alert("You have to send a code")
        try {
            await confirmationResult.confirm(code)
        } catch(e) {
            return alert("Wrong code")
        }
    }
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
                <button
                    className="login__btn"
                    ref={ loginBtn }
                >
                    Send code
                </button>
                <input
                    type="text"
                    className="login__textBox"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="code"
                />
                <button
                    className="login__btn"
                    onClick={ handleConfirm }
                >
                    Login
                </button>
            </div>
        </div>
    )
}

export default Login