import { Text } from '@entities/text'
import { InvalidCodeError } from '@entities/erros/invalid-code-error'
import { Either, left, right } from '@src/shared/either'

describe('Text domain entity', () => {
  test('should not create text with invalid code', () => {
    const code = -1
    const textOrError: Either<InvalidCodeError, Text> = Text.create({ code })
    expect(textOrError).toEqual(left(new InvalidCodeError(code)))
  })

  test('should create text with valid code', () => {
    const code = 1
    const textOrError: Either<InvalidCodeError, Text> = Text.create({ code })
    const text: Text = { code: 1 }
    expect(textOrError).toEqual(right(text))
  })
})
