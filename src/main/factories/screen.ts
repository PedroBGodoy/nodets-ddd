import { InMemoryScreenRepository } from '@src/infra/repositories/in-memory/in-memory-screen-repository'
import { ScreenRepository } from '@src/use-cases/ports/screen-repository'
import { CreateScreen } from '@usecases/create-screen'
import { CreateScreenController } from '@controllers/create-screen'

export const makeCreateScreenController = (): CreateScreenController => {
    const screenRepository: ScreenRepository = new InMemoryScreenRepository()
    const usecase = new CreateScreen(screenRepository)
    return new CreateScreenController(usecase)
}
