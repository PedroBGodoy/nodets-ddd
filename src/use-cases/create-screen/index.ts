import { InvalidCodeError } from '@entities/erros/invalid-code-error'
import { Screen, ScreenData } from '@entities/screen'
import { ScreenRepository } from '@usecases/ports/screen-repository'
import { UseCase } from '@usecases/usecase'
import { Either, left, right } from '@src/shared/either'
import { ExistingScreenError } from './errors'

export class CreateScreen implements UseCase {
  private _screenRepository: ScreenRepository

  constructor(screenRepository: ScreenRepository) {
    this._screenRepository = screenRepository
  }

  async perform(
    screenData: ScreenData
  ): Promise<Either<InvalidCodeError, Screen>> {
    const screenOrError = Screen.create(screenData)
    if (screenOrError.isLeft()) {
      return left(screenOrError.value)
    }

    if (await this._screenRepository.exists(screenData.code)) {
      return left(new ExistingScreenError())
    }

    const response = await this._screenRepository.add(screenData)
    return right(response)
  }
}
