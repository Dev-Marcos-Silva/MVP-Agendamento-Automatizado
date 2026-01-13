import { InMemoryAppointmentRepository } from '../repositories/in-memory-database/in-memory-appointment'
import { InMemoryServicesRepository } from '../repositories/in-memory-database/in-memory-services'
import { CreateAppointmentUseCase } from './create-appointment'
import { ServiceNotFoundError } from './err/service-not-found-error'

let inMemoryServicesRepository: InMemoryServicesRepository
let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: CreateAppointmentUseCase

describe('Create An Appointment', () => {
  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    inMemoryServicesRepository = new InMemoryServicesRepository()
    sut = new CreateAppointmentUseCase(
      inMemoryAppointmentRepository,
      inMemoryServicesRepository,
    )
  })

  it('It should be possible to create an appointment.', async () => {
    await inMemoryServicesRepository.createServices({
      account: {
        connect: {id: 'account-1'}
      },
      id: 'service-1',
      name: 'corte de cabelo',
      description: 'descrição do serviço',
      price: '25,00'  
    })

    await sut.execute({
      client: 'marcos',
      phone: '(00) 98765-4321',
      date: new Date(Date.now()),
      startTime: '10:00',
      endTime: '10:40',
      status: 'scheduled',
      serviceId: 'service-1'
    })

    expect(inMemoryAppointmentRepository.items[0].serviceId).toEqual('service-1')
  })

  it('It should not be possible to create an appointment.', async () => {
    await inMemoryServicesRepository.createServices({
      account: {
        connect: {id: 'account-1'}
      },
      id: 'service-1',
      name: 'corte de cabelo',
      description: 'descrição do serviço',
      price: '25,00'  
    })

    await expect(
      sut.execute({
        client: 'marcos',
        phone: '(00) 98765-4321',
        date: new Date(Date.now()),
        startTime: '10:00',
        endTime: '10:40',
        status: 'scheduled',
        serviceId: 'service-2'
      }),
    ).rejects.instanceOf(ServiceNotFoundError)
  })
})
