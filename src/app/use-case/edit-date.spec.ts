import { InMemoryDateTimeRepository } from '../repositories/in-memory-database/in-memory-date-time'
import { EditDateUseCase } from './edit-date'
import { DateTimeNotFoundError } from './err/date-time-not-found-error'

let inMemoryDateTimeRepository: InMemoryDateTimeRepository
let sut: EditDateUseCase

describe('Update A Date.', () => {
  beforeEach(() => {
    inMemoryDateTimeRepository = new InMemoryDateTimeRepository()
    sut = new EditDateUseCase(inMemoryDateTimeRepository)
  })

  it('It should be possible to update a date.', async () => {
    await inMemoryDateTimeRepository.createDateTime({
      id: 'dateTime-1',
      day: 'segunda',
      startTime: '08:00',
      endTime: '19:00',
      dayStatus: 'true',
      account: {
        connect: { id: 'account-1' },
      },
    })

    const result = await sut.execute({
      dateTimeId: 'dateTime-1',
      dayStatus: 'false',
    })

    expect(result.newDateTime.dayStatus).toEqual('false')
    expect(result.newDateTime.id).toEqual('dateTime-1')
  })

  it('It should not be possible to update a date.', async () => {
    await inMemoryDateTimeRepository.createDateTime({
      id: 'dateTime-1',
      day: 'segunda',
      startTime: '08:00',
      endTime: '19:00',
      dayStatus: 'true',
      account: {
        connect: { id: 'account-1' },
      },
    })

    await expect(
      sut.execute({
        dateTimeId: 'dateTime-2',
        dayStatus: 'false',
      }),
    ).rejects.instanceOf(DateTimeNotFoundError)
  })
})
