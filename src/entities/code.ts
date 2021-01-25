import { Either, left, right } from '../shared/either'
import { InvalidCodeError } from './erros/invalid-code-error'

export class Code {
    public readonly value: number

    private constructor(value: number) {
        this.value = value
    }

    static create(code: number): Either<InvalidCodeError, Code> {
        if (!code || !Number.isInteger(+code) || code <= 0) {
            return left(new InvalidCodeError(code))
        }
        return right(new Code(code))
    }
}
