import { Router } from 'express'
import { createUser, deleteUser, getAllUsers, getUserById, updateUser } from './user.controller'
import tokenValidate from '../../middleware/token.validate.middleware'

const userRoute = Router()

userRoute.get('/', tokenValidate, getAllUsers)
userRoute.post('/', tokenValidate, createUser)
userRoute.get('/:id', tokenValidate, getUserById)
userRoute.put('/:id', tokenValidate, updateUser)
userRoute.delete('/:id', tokenValidate, deleteUser)

export default userRoute
