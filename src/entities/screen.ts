import { Either, right, left } from '../shared/either'
import { Code } from './code'
import { InvalidCodeError } from './erros/invalid-code-error'

export interface ScreenData {
  code: number
}

export class Screen {
  public readonly code: number

  private constructor(code: number) {
    this.code = code
    Object.freeze(this)
  }

  static create(screenData: ScreenData): Either<InvalidCodeError, Screen> {
    const codeOrError: Either<InvalidCodeError, Code> = Code.create(
      screenData.code
    )
    if (codeOrError.isLeft()) {
      return left(codeOrError.value)
    }
    return right(new Screen(screenData.code))
  }
}
