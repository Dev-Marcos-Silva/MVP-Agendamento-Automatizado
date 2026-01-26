export class DateTimeAlreadyExistError extends Error {
  constructor() {
    super('Dia já foi registrado')
  }
}
