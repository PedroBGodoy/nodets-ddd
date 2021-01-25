import { Page } from '@src/entities/page'
import { PageRepository } from '@src/use-cases/ports/page-repository'
import { UseCase } from '@usecases/usecase'
import { Either, left, right } from '@src/shared/either'
import { PageNotFound } from './errors/page-not-found'

export class GetPageByCodeUseCase implements UseCase {
    private _pageRepository: PageRepository

    constructor(pageRepository: PageRepository) {
        this._pageRepository = pageRepository
    }

    async perform(code: number): Promise<Either<PageNotFound, Page>> {
        const response = await this._pageRepository.findPageByCode(code)
        if (!response) {
            return left(new PageNotFound(code))
        }
        return right(response)
    }
}
