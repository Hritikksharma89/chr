import { Router } from 'express'
import swaggerUi from 'swagger-ui-express'
import { config } from './docs.config'
import { ROUTE } from '../../core/constant'

const docsRoute = Router()
docsRoute.use(ROUTE.ROOT, swaggerUi.serve, swaggerUi.setup(config))

export default docsRoute
