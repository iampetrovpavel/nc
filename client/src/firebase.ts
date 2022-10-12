import { initializeApp } from "firebase/app"
import {
    getAuth,
    signInWithPhoneNumber,
    signOut,
    ConfirmationResult,
    ApplicationVerifier
} from "firebase/auth"
import {
    getFirestore,
    query,
    getDocs,
    collection,
    where,
    addDoc,
} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyCsTRCjbBmMtzaQG25FMhb_VuzNJIZA7aQ",
    authDomain: "nc-project-fc325.firebaseapp.com",
    projectId: "nc-project-fc325",
    storageBucket: "nc-project-fc325.appspot.com",
    messagingSenderId: "902191532007",
    appId: "1:902191532007:web:e92beb66339d335bd09f42"
}

const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
// auth.languageCode = 'en'

console.log("AUTH ", auth)

const db = getFirestore(app)

const getConfirmationCode = async (phone: string, appVerifier: ApplicationVerifier) => {
    try {
        const confirmationResult = await signInWithPhoneNumber(auth, phone, appVerifier)
        return confirmationResult
    } catch (err: any) {
        console.error(err)
        alert(err?.message)
    }
}

const signInWithPhone = async (confirmationResult: ConfirmationResult, code: string) => {
    try {
        const result = await confirmationResult.confirm(code)
        const user = result.user
        console.log("USER: ", user)
    } catch (err: any) {
        console.error(err)
        alert(err?.message)
    }
}

const logout = () => {
    signOut(auth);
}

export { getConfirmationCode, signInWithPhone, logout, auth}


