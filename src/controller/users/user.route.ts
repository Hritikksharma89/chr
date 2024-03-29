import { Router } from 'express'
import { getAll, deleteUser, updateUser, GetById, create } from './user.controller'

const userRoute = Router()

userRoute.get('/', getAll)
userRoute.get('/:id', GetById)
userRoute.post('/', create)
userRoute.delete('/:id', deleteUser)
userRoute.put('/:id', updateUser)

export default userRoute
