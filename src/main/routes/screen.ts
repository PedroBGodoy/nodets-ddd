import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreateScreenController } from '../factories/'
import { authMiddleware } from '../middleware'

const screenRouter = Router()

screenRouter.post(
  '/screen',
  authMiddleware.methodPermission,
  adaptRoute(makeCreateScreenController())
)

export default screenRouter
