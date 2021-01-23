import { Screen } from '@entities/screen'
import { ScreenRepository } from '@usecases/ports/screen-repository'

export class InMemoryScreenRepository implements ScreenRepository {
    private screens: Screen[]

    constructor(screens?: Screen[]) {
        this.screens = screens ?? []
    }

    public async findAllScreens(): Promise<Screen[]> {
        return new Promise((resolve) => {
            resolve(this.screens)
        })
    }

    public async findScreenByCode(code: number): Promise<Screen | undefined> {
        return new Promise((resolve) => {
            this.screens.forEach((screen) => {
                if (screen.code == code) {
                    resolve(screen)
                }
            })
            resolve(undefined)
        })
    }

    public async add(screen: Screen): Promise<Screen> {
        return new Promise((resolve) => {
            this.screens.push(screen)
            resolve(screen)
        })
    }

    public async exists(code: number): Promise<boolean> {
        return new Promise((resolve) => {
            this.screens.forEach((screen) => {
                if (screen.code == code) {
                    resolve(true)
                }
            })
            resolve(false)
        })
    }
}
