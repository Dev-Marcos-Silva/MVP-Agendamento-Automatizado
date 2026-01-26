import { InMemoryAccountRepository } from '../repositories/in-memory-database/in-memory-account'
import { CreateAccountUseCase } from './create-account'

let inMemoryAccountRepository: InMemoryAccountRepository
let sut: CreateAccountUseCase

describe('Create An Account.', () => {
  beforeEach(() => {
    inMemoryAccountRepository = new InMemoryAccountRepository()
    sut = new CreateAccountUseCase(inMemoryAccountRepository)
  })

  it('It should be possible to create an account.', async () => {
    await sut.execute({
      name: 'Marcos',
      email: 'marcos@gmail.com',
      password: '123456',
    })

    expect(inMemoryAccountRepository.items).toHaveLength(1)
  })
})
