import { UseCase } from '@usecases/usecase'
import { CreateTextUseCase } from '@src/use-cases/create-text'
import { TextRepository } from '@src/use-cases/ports/text-repository'
import { InMemoryTextRepository } from '@src/infra/repositories/in-memory/in-memory-text-repository'
import { CreateTextController } from '@src/web-controllers/create-text'
import { HttpRequest, HttpResponse } from '@controllers/ports'
import { TextData } from '@src/entities/text'
import { InvalidCodeError } from '@entities/erros/invalid-code-error'
import { InvalidInfoTextError } from '@src/entities/erros/invalid-info-text-error'

let textRepository: TextRepository
let createTextUseCase: UseCase
let controller: CreateTextController
let invalidRequest: HttpRequest
let validRequest: HttpRequest

beforeEach(() => {
    textRepository = new InMemoryTextRepository()
    createTextUseCase = new CreateTextUseCase(textRepository)
    controller = new CreateTextController(createTextUseCase)
    invalidRequest = {
        body: {
            infoText: 'ab',
            user: 1,
            name: 'Teste',
        },
    }
    validRequest = {
        body: {
            infoText: 'loren ipsum',
            user: 1,
            name: 'Teste',
        },
    }
})

describe('Create Text controller', () => {
    test('should return 201 when trying to create text with valid data', async () => {
        const response: HttpResponse = await controller.handle(validRequest)
        expect(response.statusCode).toEqual(201)
        expect((response.body as TextData).infoText).toBe(validRequest.body.infoText)
    })

    test('should return 400 when trying to create text with invalid data', async () => {
        const response: HttpResponse = await controller.handle(invalidRequest)
        expect(response.statusCode).toEqual(400)
        expect(response.body).toBeInstanceOf(InvalidInfoTextError)
    })
})
