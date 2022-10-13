import express from 'express'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { authRouter } from './routes/auth'

const app = express()

//CONSTANTS
const API_ROUTE = process.env.API_ROUTE || '/'
const ORIGIN = process.env.ORIGIN || ''

//MIDDLEWARES
app.use(cors({ origin: [ORIGIN] }))
app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('dev'))

//ROUTES
app.use(API_ROUTE, authRouter)

export default app
