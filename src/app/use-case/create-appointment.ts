import type { Appointment } from '@prisma/client'
import type { AppointmentRepository } from '../repositories/appointment-repositories'
import type { ServicesRepository } from '../repositories/services-repositories'
import { AppointmentAlreadyExistError } from './err/appointment-already-exist-error'
import { ServiceNotFoundError } from './err/service-not-found-error'

interface CreateAppointmentUseCaseRequest {
  client: string
  phone: string
  date: string
  startTime: string
  endTime: string
  status: 'scheduled' | 'cancelled' | 'finished'
  serviceId: string
}

interface CreateAppointmentUseCaseResponse {
  appointment: Appointment | null
}

export class CreateAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private servicesRepository: ServicesRepository,
  ) {}

  async execute({
    client,
    phone,
    date,
    startTime,
    endTime,
    status,
    serviceId,
  }: CreateAppointmentUseCaseRequest): Promise<CreateAppointmentUseCaseResponse> {
    const service = await this.servicesRepository.findById(serviceId)

    if (!service) {
      throw new ServiceNotFoundError()
    }


    const existAppointment = await this.appointmentRepository.findAppointment(
      date,
      startTime,
      endTime,
    )

    if (existAppointment?.status === 'scheduled') {
      throw new AppointmentAlreadyExistError()
    }

    const appointment = await this.appointmentRepository.createAppointment({
      client,
      phone,
      date,
      startTime,
      endTime,
      status,
      service: {
        connect: { id: service.id },
      },
    })

    return {
      appointment,
    }
  }
}
