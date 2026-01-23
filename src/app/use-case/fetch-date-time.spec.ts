import { InMemoryAppointmentRepository } from '../repositories/in-memory-database/in-memory-appointment'
import { InMemoryDateTimeRepository } from '../repositories/in-memory-database/in-memory-date-time'
import { FetchDateTimeUseCase } from './fetch-date-time'

let inMemoryDateTimeRepository: InMemoryDateTimeRepository
let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: FetchDateTimeUseCase

describe('Get All Date And Time.', () => {
  beforeEach(() => {
    inMemoryDateTimeRepository = new InMemoryDateTimeRepository()
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    sut = new FetchDateTimeUseCase(
        inMemoryDateTimeRepository,
        inMemoryAppointmentRepository 
    )
  })

  it('It should be possible to get all date and time.', async () => {

    await inMemoryDateTimeRepository.createDateTime({
        account: {
            connect: {id: 'account-1'}
        },
        day: 'segunda',
        startTime: '09:00',
        endTime: '10:00',
        dayStatus: 'true'
    })

    await inMemoryDateTimeRepository.createDateTime({
        account: {
            connect: {id: 'account-1'}
        },
        day: 'terça',
        startTime: '09:00',
        endTime: '10:00',
        dayStatus: 'true'
    })

    await inMemoryDateTimeRepository.createDateTime({
        account: {
            connect: {id: 'account-1'}
        },
        day: 'quarta',
        startTime: '09:00',
        endTime: '10:00',
        dayStatus: 'true'
    })

    const result = await sut.execute()

    /*  
        result.dateTime?.map(time => {
            return console.log(time)
        })
    */

    expect(result.dateTime).toHaveLength(3)
    
  })

  it('It should be possible to get unscheduled dates and times.', async () => {

    await inMemoryAppointmentRepository.createAppointment({
        id: 'appointment-1',
        client: 'marcos',
        phone: '(00) 98765-4321',
        date: 'segunda',
        startTime: '09:00',
        endTime: '09:30',
        status: 'scheduled',
        service: {
            connect: {id: 'service-1'}
        }
    })

    await inMemoryDateTimeRepository.createDateTime({
        account: {
            connect: {id: 'account-1'}
        },
        day: 'segunda',
        startTime: '09:00',
        endTime: '10:00',
        dayStatus: 'true'
    })

    const result = await sut.execute()

    expect(result.dateTime).toHaveLength(1)
    
  })
})
