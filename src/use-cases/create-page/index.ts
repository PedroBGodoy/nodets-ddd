import { InvalidCodeError } from '@entities/erros/invalid-code-error'
import { Page, PageData } from '@src/entities/page'
import { PageRepository } from '@src/use-cases/ports/page-repository'
import { UseCase } from '@usecases/usecase'
import { Either, left, right } from '@src/shared/either'
import { ExistingPageError } from './errors'

export class CreatePageUseCase implements UseCase {
    private _pageRepository: PageRepository

    constructor(pageRepository: PageRepository) {
        this._pageRepository = pageRepository
    }

    async perform(pageData: PageData): Promise<Either<InvalidCodeError | ExistingPageError, Page>> {
        const pageOrError = Page.create(pageData)
        if (pageOrError.isLeft()) {
            return left(pageOrError.value)
        }

        if (await this._pageRepository.exists(pageData.code)) {
            return left(new ExistingPageError())
        }

        const response = await this._pageRepository.add(pageOrError.value)
        return right(response)
    }
}
