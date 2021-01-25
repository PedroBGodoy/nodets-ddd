import { InMemoryPageRepository } from '@src/infra/repositories/in-memory/in-memory-page-repository'
import { PageRepository } from '@src/use-cases/ports/page-repository'
import { CreatePageUseCase } from '@src/use-cases/create-page'
import { CreatePageController, GetPageByCodeController } from '@src/web-controllers'
import { GetPageByCodeUseCase } from '@src/use-cases/get-page-by-code'

const pageRepository: PageRepository = new InMemoryPageRepository()

export const makeCreatePageController = (): CreatePageController => {
    const usecase = new CreatePageUseCase(pageRepository)
    return new CreatePageController(usecase)
}

export const makeGetPageByCodeController = (): GetPageByCodeController => {
    const usecase = new GetPageByCodeUseCase(pageRepository)
    return new GetPageByCodeController(usecase)
}
