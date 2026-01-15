import { InMemoryAppointmentRepository } from '../repositories/in-memory-database/in-memory-appointment'
import { InMemoryServicesRepository } from '../repositories/in-memory-database/in-memory-services'
import { CreateAppointmentUseCase } from './create-appointment'
import { AppointmentAlreadyExistError } from './err/appointment-already-exist-error'
import { InvalidTimeSlotDurationError } from './err/invalid-time-slot-duration-error'
import { ServiceNotFoundError } from './err/service-not-found-error'

let inMemoryServicesRepository: InMemoryServicesRepository
let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: CreateAppointmentUseCase

describe('Create An Appointment.', () => {
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
      date: 'segunda',
      startTime: '10:00',
      endTime: '10:30',
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
        date: 'segunda',
        startTime: '10:00',
        endTime: '10:30',
        status: 'scheduled',
        serviceId: 'service-2'
      }),
    ).rejects.instanceOf(ServiceNotFoundError)
  })

  it('It should be possible to create a new appointment for the same date and time if the previous appointment has already been canceled or completed.',
     async () => {
      await inMemoryServicesRepository.createServices({
        account: {
          connect: {id: 'account-1'}
        },
        id: 'service-1',
        name: 'corte de cabelo',
        description: 'descrição do serviço',
        price: '25,00'  
      })

      await inMemoryAppointmentRepository.createAppointment({
        client: 'marcos',
        phone: '(00) 98765-4321',
        date: 'segunda',
        startTime: '10:00',
        endTime: '10:30',
        status: 'finished',
        service: {
          connect: {id: 'service-1'}
        }
      })

      const result = await sut.execute({
        client: 'marcos',
        phone: '(00) 98765-4321',
        date: 'segunda',
        startTime: '10:00',
        endTime: '10:30',
        status: 'scheduled',
        serviceId: 'service-1'
      })

      expect(result.appointment?.status).toEqual('scheduled')
     
  })

  it('It should not be possible to create two appointments on the same date and time.', async () => {
    await inMemoryServicesRepository.createServices({
      account: {
        connect: {id: 'account-1'}
      },
      id: 'service-1',
      name: 'corte de cabelo',
      description: 'descrição do serviço',
      price: '25,00'  
    })

    await inMemoryAppointmentRepository.createAppointment({
      client: 'marcos',
      phone: '(00) 98765-4321',
      date: 'segunda',
      startTime: '10:00',
      endTime: '10:30',
      status: 'scheduled',
      service: {
        connect: {id: 'service-1'}
      }
    })

    await expect(
      sut.execute({
        client: 'marcos',
        phone: '(00) 98765-4321',
        date: 'segunda',
        startTime: '10:00',
        endTime: '10:30',
        status: 'scheduled',
        serviceId: 'service-1'
      }),
    ).rejects.instanceOf(AppointmentAlreadyExistError)
  })

  it('It should not be possible to create an appointment with less than 30 minutes.', async () => {
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
        date: 'segunda',
        startTime: '10:00',
        endTime: '10:20',
        status: 'scheduled',
        serviceId: 'service-1'
      }),
    ).rejects.instanceOf(InvalidTimeSlotDurationError)
  })

  it('It should not be possible to create an appointment longer than 30 minutes.', async () => {
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
        date: 'segunda',
        startTime: '10:00',
        endTime: '10:40',
        status: 'scheduled',
        serviceId: 'service-1'
      }),
    ).rejects.instanceOf(InvalidTimeSlotDurationError)
  })
})
