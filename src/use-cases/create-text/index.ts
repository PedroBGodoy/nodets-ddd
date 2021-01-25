import { Text, TextData } from '@src/entities/'
import { TextRepository } from '@src/use-cases/ports/text-repository'
import { UseCase } from '@usecases/usecase'
import { Either, left, right } from '@src/shared/either'
import { InvalidInfoTextError } from '@src/entities/erros/invalid-info-text-error'

export class CreateTextUseCase implements UseCase {
    private _textRepository: TextRepository

    constructor(pageRepository: TextRepository) {
        this._textRepository = pageRepository
    }

    async perform(textData: TextData): Promise<Either<InvalidInfoTextError, Text>> {
        const textOrError = Text.create(textData)
        if (textOrError.isLeft()) {
            return left(textOrError.value)
        }

        const response = await this._textRepository.add(textOrError.value)
        return right(response)
    }
}
