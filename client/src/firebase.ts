import { initializeApp } from 'firebase/app'
import {
  getAuth,
  signOut,
  ConfirmationResult,
} from 'firebase/auth'
import firebaseConfig from './firebase-config'

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)

const signInWithPhone = async (
  confirmationResult: ConfirmationResult,
  code: string,
) => {
  try {
    const result = await confirmationResult.confirm(code)
    const user = result.user
    console.log('USER: ', user)
  } catch (e: any) {
    alert(e?.message)
  }
}

const logout = () => {
  signOut(auth)
}

export { signInWithPhone, logout, auth }
