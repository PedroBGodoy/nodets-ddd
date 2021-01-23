import { Screen } from '@src/entities'
import { InvalidCodeError } from '@src/entities/erros/invalid-code-error'
import { Either, left, right } from '@src/shared/either'

describe('Screen domain entity', () => {
    test('should not create screen with invalid code', () => {
        const code = -1
        const screenOrError: Either<InvalidCodeError, Screen> = Screen.create({
            code,
        })
        expect(screenOrError).toEqual(left(new InvalidCodeError(code)))
    })

    test('should create screen with valid code', () => {
        const code = 1
        const screenOrError: Either<InvalidCodeError, Screen> = Screen.create({
            code,
        })
        const screen: Screen = { code: 1 }
        expect(screenOrError).toEqual(right(screen))
    })
})
