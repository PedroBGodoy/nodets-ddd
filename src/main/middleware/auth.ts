import { NextFunction, Request, Response } from 'express'

export const authMiddleware = {
  methodPermission: (
    request: Request,
    response: Response,
    next: NextFunction
  ): void => {
    console.log('skipping methodPermission authentication')
    next()
  },
  methodMVNOPermission: (
    request: Request,
    response: Response,
    next: NextFunction
  ): void => {
    console.log('skipping methodMVNOPermission authentication')
    next()
  },
}
