import { Page, PageData } from '@src/entities'
import { InvalidCodeError } from '@src/entities/erros/invalid-code-error'
import { InvalidNameError } from '@src/entities/erros/invalid-name-error'
import { Either, left } from '@src/shared/either'

describe('Page domain entity', () => {
    const validPageData: PageData = {
        code: 1,
        user: 1,
        name: 'Teste',
    }
    const invalidNamePageData: PageData = {
        code: 1,
        user: 1,
        name: 'ab',
    }
    const invalidCodePageData: PageData = {
        code: -1,
        user: 1,
        name: 'Teste',
    }

    test('should not create page with invalid code', () => {
        const pageOrError: Either<InvalidCodeError, Page> = Page.create(invalidCodePageData)
        expect(pageOrError).toEqual(left(new InvalidCodeError(invalidCodePageData.code)))
    })

    test('should not create page with invalid name', () => {
        const pageOrError: Either<InvalidCodeError, Page> = Page.create(invalidNamePageData)
        expect(pageOrError).toEqual(left(new InvalidNameError(invalidNamePageData.name)))
    })

    test('should create page with valid data', () => {
        const pageOrError: Either<InvalidCodeError, Page> = Page.create(validPageData)

        expect(pageOrError.value).toBeInstanceOf(Page)
        expect((pageOrError.value as Page).code).toEqual(validPageData.code)
    })
})
