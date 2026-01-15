import { InMemoryAppointmentRepository } from '../repositories/in-memory-database/in-memory-appointment'
import { AppointmentNotFoundError } from './err/appointment-not-found-error'
import { GetAppointmentUseCase } from './get-appointment'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: GetAppointmentUseCase

describe('Get An Appointment.', () => {
  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    sut = new GetAppointmentUseCase(
      inMemoryAppointmentRepository,
    )
  })

  it('It should be possible to get an appointment.', async () => {

    await inMemoryAppointmentRepository.createAppointment({
        id: 'appointment-1',
        client: 'marcos',
        phone: '(00) 98765-4321',
        date: 'segunda',
        startTime: '10:00',
        endTime: '10:40',
        status: 'scheduled',
        service: {
            connect: {id: 'service-1'}
        }
    })

    const result = await sut.execute({
        appointmentId: 'appointment-1',
    })

    expect(result.appointment.id).toEqual('appointment-1')
  })

  it('It should not be possible to get an appointment.', async () => {

    await inMemoryAppointmentRepository.createAppointment({
        id: 'appointment-1',
        client: 'marcos',
        phone: '(00) 98765-4321',
        date: 'segunda',
        startTime: '10:00',
        endTime: '10:40',
        status: 'scheduled',
        service: {
            connect: {id: 'service-1'}
        }
    })

    await expect(
      sut.execute({
        appointmentId: 'appointment-2',
      })
    ).rejects.instanceOf(AppointmentNotFoundError)
  })
})
