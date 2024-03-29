import { Router } from 'express'
import {
  forgotPassword,
  registerTokenValidate,
  resetPassword,
  signInController,
  signUpController,
} from './auth.controller'

const authRouter = Router()

authRouter.post('/sign-up', signUpController)
authRouter.post('/sign-in', signInController)
authRouter.get('/verify-email', registerTokenValidate)
authRouter.post('/forgot-Password', forgotPassword)
authRouter.post('/reset-Password', resetPassword)

export default authRouter
