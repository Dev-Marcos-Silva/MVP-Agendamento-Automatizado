import { InMemoryAccountRepository } from '../repositories/in-memory-database/in-memory-account'
import { InMemoryDateTimeRepository } from '../repositories/in-memory-database/in-memory-date-time'
import { CreateDateTimeUseCase } from './create-date-time'
import { AccountNotFoundError } from './err/account-not-found-error'

let inMemoryDateTimeRepository: InMemoryDateTimeRepository
let inMemoryAccountRepository: InMemoryAccountRepository
let sut: CreateDateTimeUseCase

describe('Create A Date And Time', () => {
  beforeEach(() => {
    inMemoryDateTimeRepository = new InMemoryDateTimeRepository()
    inMemoryAccountRepository = new InMemoryAccountRepository()
    sut = new CreateDateTimeUseCase(inMemoryDateTimeRepository, inMemoryAccountRepository)
  })

  it('It should be possible to create a date and time.', async () => {

    await inMemoryAccountRepository.createAccount({
        id: 'account-1',
        name: 'Marcos',
        email: 'marcos@gmail.com',
        password: '123456'
    })
    
    await sut.execute({
        accountId: 'account-1',
        day: 'segunda',
        startTime: '08:00',
        endTime: '19:00',
        dayStatus: 'true'
    })

    expect(inMemoryDateTimeRepository.items[0].accountId).toEqual('account-1')

  })

   it('It should not be possible to create a date and time.', async () => {

    await inMemoryAccountRepository.createAccount({
        id: 'account-1',
        name: 'Marcos',
        email: 'marcos@gmail.com',
        password: '123456'
    })
    
    await expect(
      sut.execute({
        accountId: 'account-2',
        day: 'segunda',
        startTime: '08:00',
        endTime: '19:00',
        dayStatus: 'true'
    })).rejects.instanceOf(AccountNotFoundError)
  })
})
