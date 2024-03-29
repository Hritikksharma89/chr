import { Router } from 'express'
import { getAll, GetById, create, deleteChurch, updateChurch } from './church.controller'

const churchRoute = Router()

churchRoute.get('/', getAll)
churchRoute.get('/:id', GetById)
churchRoute.post('/', create)
churchRoute.delete('/:id', deleteChurch)
churchRoute.put('/:id', updateChurch)

export default churchRoute
