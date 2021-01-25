import { Request, Response } from 'express'
import { HttpRequest } from '@controllers/ports'
import { WebController } from '@controllers/web-controller'

export const adaptRoute = (controller: WebController) => {
    return async (req: Request, res: Response): Promise<void> => {
        const httpRequest: HttpRequest = {
            body: {
                ...req.body,
                ...req.params,
                ...req.query,
            },
        }
        const httpResponse = await controller.handle(httpRequest)
        res.status(httpResponse.statusCode).json(httpResponse.body)
    }
}
