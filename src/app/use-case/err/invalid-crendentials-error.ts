export class InvalidCredentialsError extends Error {
  constructor() {
    super('Email ou Senha Incorretos')
  }
}
