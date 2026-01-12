export class AccountNotFoundError extends Error {
    constructor(){
        super('Usuário não encontrado')
    }
}