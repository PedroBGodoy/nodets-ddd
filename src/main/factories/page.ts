import { InMemoryPageRepository } from '@src/infra/repositories/in-memory/in-memory-page-repository'
import { PageRepository } from '@src/use-cases/ports/page-repository'
import { CreatePageUseCase } from '@src/use-cases/create-page'
import { CreatePageController } from '@src/web-controllers/create-page'

export const makeCreatePageController = (): CreatePageController => {
    const pageRepository: PageRepository = new InMemoryPageRepository()
    const usecase = new CreatePageUseCase(pageRepository)
    return new CreatePageController(usecase)
}
