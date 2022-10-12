import admin from "firebase-admin"
import { getAuth } from 'firebase-admin/auth'

const serviceAccount = require('../serviceAccountKey.json');
const app = admin.initializeApp({ credential: admin.credential.cert(serviceAccount) })
let auth = getAuth(app)
console.log("Firebase initialization done")

export { auth }


