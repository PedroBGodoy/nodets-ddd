import { Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makeCreatePageController, makeGetPageByCodeController } from '../factories'
import { authMiddleware } from '../middleware'

const pageRouter = Router()

pageRouter.post('/page', authMiddleware.methodPermission, adaptRoute(makeCreatePageController()))
pageRouter.get(
    '/page/:code',
    authMiddleware.methodPermission,
    adaptRoute(makeGetPageByCodeController())
)

export default pageRouter
