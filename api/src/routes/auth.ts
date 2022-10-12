import { Router } from 'express'
import { auth } from '../middlewares/auth'
import User from '../models/user'

const router = Router()

router.post('/login', auth, async (req, res) => {
    const phone = (req as any).phone
    const user = await User.findOne({ phone }).lean()
    if(user) return res.send(user)
    let newUser = new User({ phone })
    await newUser.save()
    return res.send( newUser.toObject() )
})

router.get('/profile', auth, async (req, res)=>{
    const phone: string = (req as any).phone
    const user = await User.findOne({ phone }).lean()
    return res.send(user)
})

router.post('/update', auth, async (req, res)=>{
    const phone: string = (req as any).phone
    const user = await User.findOne({ phone })
    if(!user) return res.sendStatus(400)
    if(req.body.name) user.name = req.body.name
    if(req.body.email) user.email = req.body.email
    await user.save()
    return res.send(user.toObject())
})

export { router as authRouter }