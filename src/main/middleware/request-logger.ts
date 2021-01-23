import Logger from '@src/infra/logger'
import { NextFunction, Request, Response } from 'express'

const logger = new Logger()

export const requestLogger = (request: Request, _: Response, next: NextFunction) => {
    logger.info('new request', { ip: request.ip, method: request.method, url: request.url })
    next()
}
