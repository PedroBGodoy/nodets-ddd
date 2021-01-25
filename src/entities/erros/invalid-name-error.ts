export class InvalidNameError extends Error {
    constructor(name: string) {
        super(`Nome "${name}" inválido`)
        this.name = 'InvalidNameError'
    }
}
