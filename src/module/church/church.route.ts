import { Router } from 'express'

import {
  createChurch,
  deleteChurch,
  getAllChurches,
  getChurchById,
  updateChurch,
} from './church.controller'
import tokenValidate from '../../middleware/token.validate.middleware'

const churchRoute = Router()

churchRoute.get('/', getAllChurches)
churchRoute.get('/:id', getChurchById)
churchRoute.post('/', createChurch)
churchRoute.delete('/:id', tokenValidate, deleteChurch)
churchRoute.put('/:id', updateChurch)

export default churchRoute
