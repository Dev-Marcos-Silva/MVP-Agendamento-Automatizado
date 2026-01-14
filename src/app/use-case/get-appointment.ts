import type { Appointment } from '@prisma/client'
import type { AppointmentRepository } from '../repositories/appointment-repositories'
import { AppointmentNotFoundError } from './err/appointment-not-found-error'

interface GetAppointmentUseCaseRequest {
  appointmentId: string
}

interface GetAppointmentUseCaseResponse {
  appointment: Appointment
}

export class GetAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    appointmentId,
  }: GetAppointmentUseCaseRequest): Promise<GetAppointmentUseCaseResponse> {

    const appointment = await this.appointmentRepository.findById(appointmentId)

    if (!appointment) {
      throw new AppointmentNotFoundError()
    }

    return {
      appointment
    }
  }
}
