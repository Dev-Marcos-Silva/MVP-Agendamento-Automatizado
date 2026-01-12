import { hash } from 'bcryptjs'
import { InMemoryAccountRepository } from '../repositories/in-memory-database/in-memory-account'
import { AuthenticationUseCase } from './authentication'
import { InvalidCredentialsError } from './err/invalid-crendentials-error'

let inMemoryAccountRepository: InMemoryAccountRepository
let sut: AuthenticationUseCase

describe('Authenticate Account Use Case', () => {
    beforeEach(() => {
        inMemoryAccountRepository = new InMemoryAccountRepository()
        sut = new AuthenticationUseCase(inMemoryAccountRepository)
    })

    it('It should be possible to authenticate an account.', async () => {

        const passwordHash = await hash('123456', 6)

        await inMemoryAccountRepository.createAccount({
            name: 'Marcos',
            email: 'marcos@gmail.com',
            password: passwordHash
        })

        const result = await sut.execute({
            email: 'marcos@gmail.com',
            password: '123456'
        })

        expect(inMemoryAccountRepository.items[0].id).toEqual(result.account.id)
        expect(inMemoryAccountRepository.items).toHaveLength(1)
    })

    it('It should not authenticate with wrong password.', async () => {

        const passwordHash = await hash('123456', 6)

        await inMemoryAccountRepository.createAccount({
            name: 'Marcos',
            email: 'marcos@gmail.com',
            password: passwordHash
        })

        await expect(
                sut.execute({
                email: 'marcos@gmail.com',
                password: '123455'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)

    })

    it('It should not authenticate with wrong email.', async () => {

        const passwordHash = await hash('123456', 6)

        await inMemoryAccountRepository.createAccount({
            name: 'Marcos',
            email: 'marcos@gmail.com',
            password: passwordHash
        })

        await expect(
                sut.execute({
                email: 'lucas@gmail.com',
                password: '123456'
            })
        ).rejects.toBeInstanceOf(InvalidCredentialsError)
    })
})
