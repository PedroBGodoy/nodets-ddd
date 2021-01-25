import { Page } from '../../entities'

export interface PageRepository {
    findAllPages: () => Promise<Page[]>
    findPageByCode: (code: number) => Promise<Page | undefined>
    add: (page: Page) => Promise<Page>
    exists: (code: number) => Promise<boolean>
}
