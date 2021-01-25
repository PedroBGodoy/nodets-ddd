import { Text, TextData } from '@src/entities'
import { InvalidCodeError } from '@src/entities/erros/invalid-code-error'
import { InvalidInfoTextError } from '@src/entities/erros/invalid-info-text-error'
import { Either, left } from '@src/shared/either'

describe('Page domain entity', () => {
    const validTextData: TextData = {
        user: 1,
        infoText: 'Teste',
    }
    const invalidTextPageData: TextData = {
        user: 1,
        infoText: 'ab',
    }

    test('should not create page with invalid info text', () => {
        const pageOrError: Either<InvalidCodeError, Text> = Text.create(invalidTextPageData)
        expect(pageOrError).toEqual(left(new InvalidInfoTextError(invalidTextPageData.infoText)))
    })

    test('should create page with valid data', () => {
        const pageOrError: Either<InvalidCodeError, Text> = Text.create(validTextData)

        expect(pageOrError.value).toBeInstanceOf(Text)
        expect((pageOrError.value as Text).code).toEqual(validTextData.code)
    })
})
