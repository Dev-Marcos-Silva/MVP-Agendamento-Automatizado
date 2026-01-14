import { InMemoryDateTimeRepository } from '../repositories/in-memory-database/in-memory-date-time'
import { EditTimeUseCase } from './edit-time'
import { DateTimeNotFoundError } from './err/date-time-not-found-error'

let inMemoryDateTimeRepository: InMemoryDateTimeRepository
let sut: EditTimeUseCase

describe('Update A Time.', () => {
  beforeEach(() => {
    inMemoryDateTimeRepository = new InMemoryDateTimeRepository()
    sut = new EditTimeUseCase(
      inMemoryDateTimeRepository
    )
  })

  it('It should be possible to update a time.', async () => {

    await inMemoryDateTimeRepository.createDateTime({
        id: 'dateTime-1',
        day: 'segunda',
        startTime: '08:00',
        endTime: '19:00',
        dayStatus: 'true',
        account: {
            connect: { id : 'account-1'}
        }
    })

    const result = await sut.execute({
        dateTimeId: 'dateTime-1',
        startTime: '07:00',
        endTime: '16:00'
    })

    expect(result.newDateTime.startTime).toEqual('07:00')
    expect(result.newDateTime.endTime).toEqual('16:00')
  })

  it('It should not be possible to update a time.', async () => {

    await inMemoryDateTimeRepository.createDateTime({
        id: 'dateTime-1',
        day: 'segunda',
        startTime: '08:00',
        endTime: '19:00',
        dayStatus: 'true',
        account: {
            connect: { id : 'account-1'}
        }
    })

    await expect(
      sut.execute({
        dateTimeId: 'dateTime-2',
        startTime: '07:00',
        endTime: '16:00'
      })
    ).rejects.instanceOf(DateTimeNotFoundError)
  })
})
