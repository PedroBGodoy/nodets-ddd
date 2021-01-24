import { Either, right, left } from '../shared/either'
import { Code } from './code'
import { InvalidCodeError } from './erros/invalid-code-error'
import { InvalidNameError } from './erros/invalid-name-error'
import { Name } from './name'

export interface PageData {
    code: number
    name: string
    user: number
    createdAt?: Date
    updatedAt?: Date
    active?: boolean
}

export class Page {
    public readonly code: number
    public readonly name: string
    public readonly createdAt: Date
    public readonly updatedAt: Date
    public readonly active: boolean

    private constructor(pageData: PageData) {
        this.code = pageData.code
        this.name = pageData.name
        this.createdAt = pageData.createdAt ?? new Date()
        this.updatedAt = pageData.updatedAt ?? new Date()
        this.active = pageData.active ?? true
        Object.freeze(this)
    }

    static create(pageData: PageData): Either<InvalidCodeError, Page> {
        const codeOrError: Either<InvalidCodeError, Code> = Code.create(pageData.code)
        const nameOrError: Either<InvalidNameError, Name> = Name.create(pageData.name)
        if (codeOrError.isLeft()) return left(codeOrError.value)
        if (nameOrError.isLeft()) return left(nameOrError.value)

        return right(new Page(pageData))
    }
}
