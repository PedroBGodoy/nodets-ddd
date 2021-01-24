import { Page } from '@src/entities/page'
import { PageRepository } from '@src/use-cases/ports/page-repository'

export class InMemoryPageRepository implements PageRepository {
    private pages: Page[]

    constructor(pages?: Page[]) {
        this.pages = pages ?? []
    }

    public async findAllPages(): Promise<Page[]> {
        return new Promise((resolve) => {
            resolve(this.pages)
        })
    }

    public async findPageByCode(code: number): Promise<Page | undefined> {
        return new Promise((resolve) => {
            this.pages.forEach((page) => {
                if (page.code == code) {
                    resolve(page)
                }
            })
            resolve(undefined)
        })
    }

    public async add(page: Page): Promise<Page> {
        return new Promise((resolve) => {
            this.pages.push(page)
            resolve(page)
        })
    }

    public async exists(code: number): Promise<boolean> {
        return new Promise((resolve) => {
            this.pages.forEach((page) => {
                if (page.code == code) {
                    resolve(true)
                }
            })
            resolve(false)
        })
    }
}
