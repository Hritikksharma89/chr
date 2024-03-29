import { Router } from 'express'
import { signUp } from './auth.controller'

const authRoute = Router()

authRoute.post('/sign-up', signUp)

export default authRoute
