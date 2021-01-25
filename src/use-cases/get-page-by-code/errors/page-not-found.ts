export class PageNotFound extends Error {
    constructor(code: number) {
        super(`Página não encontrada com código "${code}"`)
        this.name = 'PageNotFound'
    }
}
