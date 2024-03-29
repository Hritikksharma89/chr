import { Router } from 'express'

import { ROUTE } from '../../core/constant'
import {
  createEvent,
  deleteEvent,
  getAllEvents,
  getEventById,
  updateEvent,
} from './event.controller'

const eventRoute = Router()

eventRoute.route(ROUTE.ROOT).get(getAllEvents).post(createEvent)

eventRoute.route(ROUTE.ID).get(getEventById).put(updateEvent).delete(deleteEvent)

export default eventRoute
