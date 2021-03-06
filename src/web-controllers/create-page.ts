import { UseCase } from '@usecases/usecase'
import { HttpRequest, HttpResponse } from './ports'
import { badRequest, created, serverError } from './utils/http-helper'
import { WebController } from './web-controller'

export class CreatePageController implements WebController {
    private readonly usecase: UseCase

    constructor(usecase: UseCase) {
        this.usecase = usecase
    }

    async handle(request: HttpRequest): Promise<HttpResponse> {
        try {
            const response = await this.usecase.perform(request.body)

            if (response.isRight()) {
                return created(response.value)
            } else {
                return badRequest(response.value)
            }
        } catch (error) {
            return serverError(error)
        }
    }
}
