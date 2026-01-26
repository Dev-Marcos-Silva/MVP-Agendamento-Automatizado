export class AppointmentAlreadyExistError extends Error {
  constructor() {
    super('Já existe um agendamento nessa data')
  }
}
