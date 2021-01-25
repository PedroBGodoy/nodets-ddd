import { Either, left, right } from '../shared/either'
import { InvalidNameError } from './erros/invalid-name-error'

export class Name {
    public readonly value: string

    private constructor(value: string) {
        this.value = value
    }

    static create(name: string): Either<InvalidNameError, Name> {
        if (!name || name.length < 3) {
            return left(new InvalidNameError(name))
        }
        return right(new Name(name))
    }
}
