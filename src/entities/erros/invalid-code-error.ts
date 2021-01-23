export class InvalidCodeError extends Error {
    constructor(code: number) {
        super(`Código "${code}" inválido`)
        this.name = 'InvalidCodeError'
    }
}
