import type { Appointment } from '@prisma/client'
import type { AppointmentRepository } from '../repositories/appointment-repositories'
import { AppointmentNotFoundError } from './err/appointment-not-found-error'

interface EditAppointmentUseCaseRequest {
  appointmentId: string
  status: 'scheduled' | 'cancelled' | 'finished'
}

interface EditAppointmentUseCaseResponse {
  newAppointment: Appointment
}

export class EditAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    appointmentId,
    status,
  }: EditAppointmentUseCaseRequest): Promise<EditAppointmentUseCaseResponse> {
    const appointment = await this.appointmentRepository.findById(appointmentId)

    if (!appointment) {
      throw new AppointmentNotFoundError()
    }

    appointment.status = status

    const newAppointment =
      await this.appointmentRepository.updateAppointment(appointment)

    if (!newAppointment) {
      throw new AppointmentNotFoundError()
    }

    return {
      newAppointment,
    }
  }
}
