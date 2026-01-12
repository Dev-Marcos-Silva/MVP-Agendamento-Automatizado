import { InMemoryAccountRepository } from '../repositories/in-memory-database/in-memory-account'
import { InMemoryServicesRepository } from '../repositories/in-memory-database/in-memory-services'
import { CreateServicesUseCase } from './create-services'
import { AccountNotFoundError } from './err/account-not-found-error'

let inMemoryServicesRepository: InMemoryServicesRepository
let inMemoryAccountRepository: InMemoryAccountRepository
let sut: CreateServicesUseCase

describe('Create A Service', () => {
  beforeEach(() => {
    inMemoryServicesRepository = new InMemoryServicesRepository()
    inMemoryAccountRepository = new InMemoryAccountRepository()
    sut = new CreateServicesUseCase(
      inMemoryServicesRepository,
      inMemoryAccountRepository,
    )
  })

  it('It should be possible to create a service.', async () => {
    await inMemoryAccountRepository.createAccount({
      id: 'account-1',
      name: 'Marcos',
      email: 'marcos@gmail.com',
      password: '123456',
    })

    await sut.execute({
      accountId: 'account-1',
      name: 'cortes de cabelo',
      description: 'descrição do serviço',
      price: '25,00'
    })

    expect(inMemoryServicesRepository.items[0].accountId).toEqual('account-1')
  })

  it('It should not be possible to create a service.', async () => {
    await inMemoryAccountRepository.createAccount({
      id: 'account-1',
      name: 'Marcos',
      email: 'marcos@gmail.com',
      password: '123456',
    })

    await expect(
      sut.execute({
        accountId: 'account-2',
        name: 'cortes de cabelo',
        description: 'descrição do serviço',
        price: '25,00'
      }),
    ).rejects.instanceOf(AccountNotFoundError)
  })
})
