import mongoose from 'mongoose'
import C from './constants'

async function connectMongo() {
    const password = process.env.MONGO_PASSWORD
    const user = process.env.MONGO_USER
    if(!user || !password) throw new Error(C.MONGO_USER_OR_PASSWORD_ERROR)
    await mongoose.connect(`mongodb+srv://${user}:${password}@cluster0.tlajp.mongodb.net/?retryWrites=true&w=majority`)
}

export default connectMongo
