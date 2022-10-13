import { RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { useEffect, useRef, useState } from 'react';
import { useAuthState } from "react-firebase-hooks/auth"
import { useNavigate } from 'react-router-dom'
import { auth } from './firebase'

//+358415708221

let confirmationResult: ConfirmationResult | null = null
let recaptchaVerifier: RecaptchaVerifier | null | any = null

const Login = () => {
    const [phone, setPhone] = useState("")
    const [code, setCode] = useState("")
    const [confirmLoading, setConfirmLoading] = useState(false)
    const [sentCode, setSentCode] = useState(false)
    const [ready, setReady] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [verified, setVerified] = useState(false)
    const [user, loading] = useAuthState(auth)
    const navigate = useNavigate()
    const loginBtn = useRef<HTMLButtonElement>(null)
    useEffect(() => {
        if (loading) {
            return
        }
        if (user) navigate("/profile")
    }, [user, loading])

    useEffect(() => {
        if (!verified) return
        login()
    }, [verified])

    useEffect(() => {
        initCaptcha()
    }, [])
    async function login() {
        if(!recaptchaVerifier) return
        try {
            confirmationResult = await signInWithPhoneNumber(auth, phone, recaptchaVerifier)
            setSentCode(true)
        } catch (e) {
            setError('Invalid phone number')
        }
    }

    async function initCaptcha() {
        if (!loginBtn.current) return
        recaptchaVerifier = new RecaptchaVerifier(loginBtn.current,
            {
                'size': 'invisible',
                'callback': async () => {
                    setVerified(true)
                }
            },
            auth
        )
        await recaptchaVerifier.render()
        setReady(true)
    }

    async function handleConfirm() {
        if (!code || code.length !== 6) return setError("Code not valid")
        if (!confirmationResult) return setError("You have to send a code")
        try {
            setConfirmLoading(true)
            await confirmationResult.confirm(code)
        } catch (e) {
            setConfirmLoading(false)
            return setError("Wrong code")
        }
    }

    return (
        <div className='box'>
            {error && <div className="notification is-danger">
                <button className="delete" onClick={() => setError(null)}></button>
                {error}
            </div>}
            <div className="field">
                <label className="label is-large">Phone:</label>
                <p className="control has-icons-left">
                    <input
                        className="input is-large"
                        placeholder="+1234567890"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                    <span className="icon is-large is-left">
                        <i className="fas fa-phone"></i>
                    </span>
                </p>
            </div>
            {sentCode && <div className="notification is-info">
                Code sent to you phone
            </div>}
            <div className="field" style={{display: sentCode?'none':'block'}}>
                <p className="control">
                    <button
                        ref={loginBtn}
                        className="button is-success"
                        disabled={!ready}
                    >
                        Send code
                    </button>
                </p>
            </div>
            {sentCode &&
                <>
                    <div className="field">
                        <label className="label is-large">Code:</label>
                        <p className="control has-icons-left">
                            <input
                                className="input is-large"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                placeholder="123456"
                            />
                            <span className="icon is-large is-left">
                                <i className="fas fa-lock"></i>
                            </span>
                        </p>
                    </div>
                    <div className="field">
                        <p className="control">
                            <button
                                className={confirmLoading ? "button is-success is-loading" : "button is-success"}
                                onClick={handleConfirm}
                            >
                                Login
                            </button>
                        </p>
                    </div>
                </>
            }

        </div>
    )
}

export default Login