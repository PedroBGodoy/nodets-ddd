export class ExistingPageError extends Error {
    constructor() {
        super('Código de tela em uso')
        this.name = 'ExistingPageError'
    }
}
