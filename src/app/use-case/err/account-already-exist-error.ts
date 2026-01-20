export class AccountAlreadyExistError extends Error {
    constructor(){
        super('Error ao criar conta')
    }
}