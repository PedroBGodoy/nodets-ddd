import { Router, Request, Response } from 'express'

const baseRouter = Router()

baseRouter.get('/', (_: Request, response: Response) => {
    response.send({ ok: ':)' })
})

export default baseRouter
