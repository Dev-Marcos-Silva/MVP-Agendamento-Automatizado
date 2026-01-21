export class DateTimeNotCreatedError extends Error {
    constructor(){
        super('Dia e horário  não criado!')
    }
}