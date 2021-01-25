import { InMemoryTextRepository } from '@src/infra/repositories/in-memory/in-memory-text-repository'
import { TextRepository } from '@src/use-cases/ports/text-repository'
import { CreateTextUseCase } from '@src/use-cases/create-text'
import { CreateTextController } from '@src/web-controllers/create-text'

export const makeCreateTextController = (): CreateTextController => {
    const pageRepository: TextRepository = new InMemoryTextRepository()
    const usecase = new CreateTextUseCase(pageRepository)
    return new CreateTextController(usecase)
}
