import express from 'express'
import { signup, login, logout } from '../controllers/user.js'
import sessionExtractor from '../middlewares/sessionExtractor.js'

const userRouter = express.Router()

userRouter.post('/signup', signup)
userRouter.post('/login', login)
userRouter.post('/logout', sessionExtractor, logout)

export default userRouter
