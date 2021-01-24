import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreatePageController } from '../factories'
import { authMiddleware } from '../middleware'

const pageRouter = Router()

pageRouter.post('/page', authMiddleware.methodPermission, adaptRoute(makeCreatePageController()))

export default pageRouter
