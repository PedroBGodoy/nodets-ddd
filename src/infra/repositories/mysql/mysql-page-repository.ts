import { Page } from '@src/entities/page'
import { PageRepository } from '@src/use-cases/ports/page-repository'

export class MySQLPageRepository implements PageRepository {
    public async findAllPages(): Promise<Page[]> {
        return new Promise(() => console.log('findAllPages'))
    }

    public async findPageByCode(): Promise<Page> {
        return new Promise(() => console.log('findPageByCode'))
    }

    public async add(page: Page): Promise<Page> {
        return new Promise((resolve) => resolve(page))
    }

    public async exists(code: number): Promise<boolean> {
        return new Promise((resolve) => {
            if (code == 1) resolve(false)
        })
    }
}
