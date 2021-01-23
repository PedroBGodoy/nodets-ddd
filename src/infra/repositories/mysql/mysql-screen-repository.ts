import { Screen } from '@entities/screen'
import { ScreenRepository } from '@usecases/ports/screen-repository'

export class MySQLScreenRepository implements ScreenRepository {
  public async findAllScreens(): Promise<Screen[]> {
    return new Promise(() => console.log('findAllScreens'))
  }

  public async findScreenByCode(): Promise<Screen> {
    return new Promise(() => console.log('findScreenByCode'))
  }

  public async add(screen: Screen): Promise<Screen> {
    return new Promise((resolve) => resolve(screen))
  }

  public async exists(code: number): Promise<boolean> {
    return new Promise((resolve) => {
      if (code == 1) resolve(false)
    })
  }
}
