import { UseCase } from '@usecases/usecase'
import { CreatePageUseCase } from '@src/use-cases/create-page'
import { PageRepository } from '@src/use-cases/ports/page-repository'
import { InMemoryPageRepository } from '@src/infra/repositories/in-memory/in-memory-page-repository'
import { CreatePageController } from '@src/web-controllers/create-page'
import { HttpRequest, HttpResponse } from '@controllers/ports'
import { PageData } from '@src/entities/page'
import { InvalidCodeError } from '@entities/erros/invalid-code-error'
import { ExistingPageError } from '@src/use-cases/create-page/errors'

let pageRepository: PageRepository
let createPageUseCase: UseCase
let controller: CreatePageController
let invalidRequest: HttpRequest
let validRequest: HttpRequest

beforeEach(() => {
    pageRepository = new InMemoryPageRepository()
    createPageUseCase = new CreatePageUseCase(pageRepository)
    controller = new CreatePageController(createPageUseCase)
    invalidRequest = {
        body: {
            code: -1,
            user: 1,
            name: 'Teste',
        },
    }
    validRequest = {
        body: {
            code: 1,
            user: 1,
            name: 'Teste',
        },
    }
})

describe('Create Page controller', () => {
    test('should return 201 when trying to create page with valid code', async () => {
        const response: HttpResponse = await controller.handle(validRequest)
        expect(response.statusCode).toEqual(201)
        expect((response.body as PageData).code).toBe(validRequest.body.code)
    })

    test('should return 400 when trying to create page with duplicate code', async () => {
        const responseValid: HttpResponse = await controller.handle(validRequest)
        expect(responseValid.statusCode).toEqual(201)
        expect((responseValid.body as PageData).code).toBe(validRequest.body.code)

        const response: HttpResponse = await controller.handle(validRequest)
        expect(response.statusCode).toEqual(400)
        expect(response.body).toBeInstanceOf(ExistingPageError)
    })

    test('should return 400 when trying to create page with invalid code', async () => {
        const response: HttpResponse = await controller.handle(invalidRequest)
        expect(response.statusCode).toEqual(400)
        expect(response.body).toBeInstanceOf(InvalidCodeError)
    })
})
