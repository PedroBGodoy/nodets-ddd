import { Either, right, left } from '../shared/either'
import { InvalidInfoTextError } from './erros/invalid-info-text-error'
import { InfoText } from './info-text'

export interface TextData {
    code?: number
    infoText: string
    user: number
    createdAt?: Date
    updatedAt?: Date
    active?: boolean
}

export class Text {
    public readonly code: number | undefined
    public readonly infoText: string
    public readonly createdAt: Date
    public readonly updatedAt: Date
    public readonly active: boolean

    private constructor(pageData: TextData) {
        this.code = pageData.code
        this.infoText = pageData.infoText
        this.createdAt = pageData.createdAt ?? new Date()
        this.updatedAt = pageData.updatedAt ?? new Date()
        this.active = pageData.active ?? true
        Object.freeze(this)
    }

    static create(textData: TextData): Either<InvalidInfoTextError, Text> {
        const infoTextOrError: Either<InvalidInfoTextError, InfoText> = InfoText.create(
            textData.infoText
        )
        if (infoTextOrError.isLeft()) return left(infoTextOrError.value)

        return right(new Text(textData))
    }
}
