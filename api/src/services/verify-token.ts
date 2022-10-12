import { auth } from '../firebase'

async function verifyToken(token: string) {
    const decodedToken = await auth.verifyIdToken(token)
    return decodedToken
}

export default verifyToken
