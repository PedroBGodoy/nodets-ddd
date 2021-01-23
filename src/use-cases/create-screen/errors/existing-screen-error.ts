export class ExistingScreenError extends Error {
  constructor() {
    super('Código de tela em uso')
    this.name = 'ExistingScreenError'
  }
}
