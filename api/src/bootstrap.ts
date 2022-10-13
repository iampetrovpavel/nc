import path from 'path'
const env_path = path.resolve(process.cwd(), `.env.${process.env.NODE_ENV}`)
const env = require('dotenv').config({ path: env_path })
console.log('Loaded env variables: ', env.parsed)
import app from './app'
import connectMongo from './mongoose'
import './firebase'

async function bootstrap() {
  try {
    await connectMongo()
    console.log('Connected to Mongo Atlas')
    const PORT = process.env.PORT || 8000
    await new Promise<void>((done) => {
      app.listen(PORT, () => done())
    })
    console.log(`Server listening on port ${PORT}...`)
  } catch (error) {
    console.error('Server starting error: ', error.message)
  }
}

export default bootstrap
