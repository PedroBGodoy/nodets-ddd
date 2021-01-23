import { UseCase } from '@usecases/usecase'
import { CreateScreen } from '@usecases/create-screen'
import { ScreenRepository } from '@usecases/ports/screen-repository'
import { InMemoryScreenRepository } from '@src/infra/repositories/in-memory/in-memory-screen-repository'
import { CreateScreenController } from '@controllers/create-screen'
import { HttpRequest, HttpResponse } from '@controllers/ports'
import { ScreenData } from '@entities/screen'
import { InvalidCodeError } from '@entities/erros/invalid-code-error'
import { ExistingScreenError } from '@usecases/create-screen/errors'

describe('Create Screen controller', () => {
    const screenRepository: ScreenRepository = new InMemoryScreenRepository()
    const createScreenUseCase: UseCase = new CreateScreen(screenRepository)
    const controller = new CreateScreenController(createScreenUseCase)
    const invalidRequest: HttpRequest = {
        body: {
            code: -1,
        },
    }
    const validRequest: HttpRequest = {
        body: {
            code: 1,
        },
    }

    test('should return 201 when trying to create screen with valid code', async () => {
        const response: HttpResponse = await controller.handle(validRequest)
        expect(response.statusCode).toEqual(201)
        expect((response.body as ScreenData).code).toBe(validRequest.body.code)
    })

    test('should return 400 when trying to create screen with duplicate code', async () => {
        const response: HttpResponse = await controller.handle(validRequest)
        expect(response.statusCode).toEqual(400)
        expect(response.body).toBeInstanceOf(ExistingScreenError)
    })

    test('should return 400 when trying to create screen with invalid code', async () => {
        const response: HttpResponse = await controller.handle(invalidRequest)
        expect(response.statusCode).toEqual(400)
        expect(response.body).toBeInstanceOf(InvalidCodeError)
    })
})
