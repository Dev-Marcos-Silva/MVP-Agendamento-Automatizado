import { InMemoryAccountRepository } from '../repositories/in-memory-database/in-memory-account'
import { InMemoryAppointmentRepository } from '../repositories/in-memory-database/in-memory-appointment'
import { AccountNotFoundError } from './err/account-not-found-error'
import { FetchAppointmentUseCase } from './fetch-appointment'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let inMemoryAccountRepository: InMemoryAccountRepository
let sut: FetchAppointmentUseCase

describe('Catches All Appointments.', () => {
  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    inMemoryAccountRepository = new InMemoryAccountRepository()
    sut = new FetchAppointmentUseCase(
      inMemoryAppointmentRepository,
      inMemoryAccountRepository
    )
  })

  it('It should be possible to retrieve all appointments.', async () => {

    await inMemoryAccountRepository.createAccount({
        id: 'account-1',
        name: 'Marcos',
        email: 'marcos@gmail.com',
        password: '123456'
    })

    await inMemoryAppointmentRepository.createAppointment({
        id: 'appointment-1',
        client: 'marcos',
        phone: '(00) 98765-4321',
        date: new Date(Date.now()),
        startTime: '10:00',
        endTime: '10:40',
        status: 'scheduled',
        service: {
            connect: {id: 'service-1'}
        }
    })

    await inMemoryAppointmentRepository.createAppointment({
        id: 'appointment-2',
        client: 'marcos',
        phone: '(00) 98765-4321',
        date: new Date(Date.now()),
        startTime: '09:00',
        endTime: '09:40',
        status: 'scheduled',
        service: {
            connect: {id: 'service-1'}
        }
    })
    
    const result = await sut.execute({
        accountId: 'account-1',
    })


    expect(result.appointments[0].id).toEqual('appointment-1')
    expect(result.appointments[1].id).toEqual('appointment-2')
    
  })

  it('It should not be possible to retrieve all appointments.', async () => {

    await inMemoryAccountRepository.createAccount({
        id: 'account-1',
        name: 'Marcos',
        email: 'marcos@gmail.com',
        password: '123456'
    })

    await inMemoryAppointmentRepository.createAppointment({
        id: 'appointment-1',
        client: 'marcos',
        phone: '(00) 98765-4321',
        date: new Date(Date.now()),
        startTime: '10:00',
        endTime: '10:40',
        status: 'scheduled',
        service: {
            connect: {id: 'service-1'}
        }
    })

    await inMemoryAppointmentRepository.createAppointment({
        id: 'appointment-2',
        client: 'marcos',
        phone: '(00) 98765-4321',
        date: new Date(Date.now()),
        startTime: '09:00',
        endTime: '09:40',
        status: 'scheduled',
        service: {
            connect: {id: 'service-1'}
        }
    })
    
    await expect(sut.execute({
        accountId: 'account-2',
    })).rejects.instanceOf(AccountNotFoundError)  
  })
})
