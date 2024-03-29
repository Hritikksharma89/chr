import express, { Application } from 'express'
import { env } from './environment/environment'
import { CONSTANT, ROUTE } from './constant'
import { logger } from './log/log'
import { errorHandler } from './middleware/error.middleware'
import mongoose from 'mongoose'
import userRoute from './controller/users/user.route'
import churchRoute from './controller/church/church.route'
import authRoute from './controller/authentication/auth.route'

const app: Application = express()
const PORT = env.PORT

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.json())

// Connect to MongoDB
mongoose
  .connect(env.DATABASE_URL)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch((error) => console.log(error.message))

// Define routes
app.use('/users', userRoute)
app.use('/church', churchRoute)
app.use('/auth', authRoute)

// Error handling middleware
app.use(errorHandler)

app.listen(PORT, () => {
  try {
    logger.info(CONSTANT.SERVER_RUNNING + PORT, CONSTANT.SUCCESS)
  } catch (error) {
    logger.error(CONSTANT.SERVER_ERROR, error)
  }
})

process.on(CONSTANT.UNHANDLED_REJECTION, (reason, promise) => {
  logger.error(CONSTANT.UNHANDLED_REJECTION, promise, CONSTANT.REASON, reason)
  process.exit(1)
})
