import { Either, right, left } from '../shared/either'
import { Code } from './code'
import { InvalidCodeError } from './erros/invalid-code-error'

interface TextData {
    code: number
}

export class Text {
    public readonly code: number

    private constructor(code: number) {
        this.code = code
        Object.freeze(this)
    }

    static create(textData: TextData): Either<InvalidCodeError, Text> {
        const codeOrError: Either<InvalidCodeError, Code> = Code.create(textData.code)
        if (codeOrError.isLeft()) {
            return left(codeOrError.value)
        }
        return right(new Text(textData.code))
    }
}
