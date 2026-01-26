import { InMemoryAppointmentRepository } from '../repositories/in-memory-database/in-memory-appointment'
import { EditAppointmentUseCase } from './edit-appointment'
import { AppointmentNotFoundError } from './err/appointment-not-found-error'

let inMemoryAppointmentRepository: InMemoryAppointmentRepository
let sut: EditAppointmentUseCase

describe('Update An Appointment.', () => {
  beforeEach(() => {
    inMemoryAppointmentRepository = new InMemoryAppointmentRepository()
    sut = new EditAppointmentUseCase(inMemoryAppointmentRepository)
  })

  it('It should be possible to update an appointment.', async () => {
    await inMemoryAppointmentRepository.createAppointment({
      id: 'appointment-1',
      client: 'marcos',
      phone: '(00) 98765-4321',
      date: 'segunda',
      startTime: '10:00',
      endTime: '10:40',
      status: 'scheduled',
      service: {
        connect: { id: 'service-1' },
      },
    })

    const result = await sut.execute({
      appointmentId: 'appointment-1',
      status: 'cancelled',
    })

    expect(result.newAppointment.status).toEqual('cancelled')
    expect(result.newAppointment.id).toEqual('appointment-1')
  })

  it('It should not be possible to update an appointment.', async () => {
    await inMemoryAppointmentRepository.createAppointment({
      id: 'appointment-1',
      client: 'marcos',
      phone: '(00) 98765-4321',
      date: 'segunda',
      startTime: '10:00',
      endTime: '10:40',
      status: 'scheduled',
      service: {
        connect: { id: 'service-1' },
      },
    })

    await expect(
      sut.execute({
        appointmentId: 'appointment-2',
        status: 'cancelled',
      }),
    ).rejects.instanceOf(AppointmentNotFoundError)
  })
})
