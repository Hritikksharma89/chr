import mongoose from 'mongoose'
import express, { Application } from 'express'

import { CONSTANT, ROUTE } from './core/constant'
import { env } from './core/environment/environment'
import { Responses } from './core/common/response'
import { logger } from './core/log/log'

import authRouter from './module/auth/auth.route'
import userRoute from './module/user/user.route'
import churchRoute from './module/church/church.route'
import eventRoute from './module/event/event.route'

const app: Application = express()
const PORT = env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.json())

mongoose
  .connect(env.DATABASE_URL!)
  .then(() => {
    console.log(CONSTANT.DATABASE_CONNECT_SUCCESS)
  })
  .catch((error) => console.log(error.message))

app.use(ROUTE.USERS, userRoute)
app.use(ROUTE.AUTH, authRouter)
app.use(ROUTE.CHURCH, churchRoute)
app.use(ROUTE.EVENTS, eventRoute)
app.use(ROUTE.DOCS, churchRoute)
app.use(ROUTE.ROOT, (_req, res) => Responses(res, CONSTANT.SERVER_RUNNING))

app.listen(PORT, () => {
  try {
    logger.info(CONSTANT.SERVER_RUNNING + ':' + PORT, CONSTANT.SUCCESS)
  } catch (error) {
    logger.error(CONSTANT.SERVER_ERROR, error)
  }
})

process.on(CONSTANT.UNHANDLED_REJECTION, (reason, promise) => {
  logger.error(CONSTANT.UNHANDLED_REJECTION, promise, CONSTANT.REASON, reason)
  process.exit(1)
})
