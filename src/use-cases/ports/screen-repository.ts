import { Screen } from '../../entities'

export interface ScreenRepository {
    findAllScreens: () => Promise<Screen[]>
    findScreenByCode: (code: number) => Promise<Screen | undefined>
    add: (screen: Screen) => Promise<Screen>
    exists: (code: number) => Promise<boolean>
}
