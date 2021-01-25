import { Text } from '@src/entities/text'
import { TextRepository } from '@src/use-cases/ports/text-repository'

export class InMemoryTextRepository implements TextRepository {
    private texts: Text[]

    constructor(pages?: Text[]) {
        this.texts = pages ?? []
    }

    public async findAllTexts(): Promise<Text[]> {
        return new Promise((resolve) => {
            resolve(this.texts)
        })
    }

    public async findTextByCode(code: number): Promise<Text | undefined> {
        return new Promise((resolve) => {
            this.texts.forEach((page) => {
                if (page.code == code) {
                    resolve(page)
                }
            })
            resolve(undefined)
        })
    }

    public async add(page: Text): Promise<Text> {
        return new Promise((resolve) => {
            this.texts.push(page)
            resolve(page)
        })
    }

    public async exists(code: number): Promise<boolean> {
        return new Promise((resolve) => {
            this.texts.forEach((page) => {
                if (page.code == code) {
                    resolve(true)
                }
            })
            resolve(false)
        })
    }
}
