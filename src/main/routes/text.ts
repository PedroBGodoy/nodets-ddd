import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreateTextController } from '../factories'
import { authMiddleware } from '../middleware'

const pageRouter = Router()

pageRouter.post('/text', authMiddleware.methodPermission, adaptRoute(makeCreateTextController()))

export default pageRouter
