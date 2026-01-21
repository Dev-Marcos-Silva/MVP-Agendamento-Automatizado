export class AppointmentNotCreatedError extends Error {
    constructor(){
        super('Agendamento não criado!')
    }
}