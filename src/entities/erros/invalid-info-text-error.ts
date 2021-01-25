export class InvalidInfoTextError extends Error {
    constructor(infoText: string) {
        super(`Texto "${infoText}" inválido`)
        this.name = 'InvalidInfoTextError'
    }
}
