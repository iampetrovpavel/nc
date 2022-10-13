import { NextFunction, Request, Response } from 'express'
import verifyToken from '../services/verify-token'

async function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization
  if (!token) return res.sendStatus(403)
  const decodedToken = await verifyToken(token)
  const phone = decodedToken.phone_number
  if (!phone) res.sendStatus(403);
  (req as any).phone = phone
  next()
}

export { auth }
