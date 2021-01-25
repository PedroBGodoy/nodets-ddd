import { Either, left, right } from '../shared/either'
import { InvalidInfoTextError } from './erros/invalid-info-text-error'

export class InfoText {
    public readonly value: string

    private constructor(value: string) {
        this.value = value
    }

    static create(infoText: string): Either<InvalidInfoTextError, InfoText> {
        if (!infoText || infoText.length < 3) {
            return left(new InvalidInfoTextError(infoText))
        }
        return right(new InfoText(infoText))
    }
}
