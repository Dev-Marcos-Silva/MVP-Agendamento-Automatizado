import type { Appointment } from '@prisma/client'
import { isValid30MinSlot } from '@/utils/is-valid-30-min-slot'
import type { AppointmentRepository } from '../repositories/appointment-repositories'
import type { DateTimeRepository } from '../repositories/datetime-repositories'
import type { ServicesRepository } from '../repositories/services-repositories'
import { AppointmentAlreadyExistError } from './err/appointment-already-exist-error'
import { AppointmentNotCreatedError } from './err/appointment-not-created-error'
import { DateTimeNotFoundError } from './err/date-time-not-found-error'
import { InvalidTimeSlotDurationError } from './err/invalid-time-slot-duration-error'
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
  appointment: Appointment
}

export class CreateAppointmentUseCase {
  constructor(
    private appointmentRepository: AppointmentRepository,
    private servicesRepository: ServicesRepository,
    private dateTimeRepository: DateTimeRepository,
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

    const dayExist = await this.dateTimeRepository.findByDay(date)

    if (!dayExist) {
      throw new DateTimeNotFoundError()
    }

    const existAppointment = await this.appointmentRepository.findAppointment(
      date,
      startTime,
      endTime,
    )

    if (existAppointment?.status === 'scheduled') {
      throw new AppointmentAlreadyExistError()
    }

    const isValid = isValid30MinSlot(startTime, endTime)

    if (!isValid) {
      throw new InvalidTimeSlotDurationError()
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

    if (!appointment) {
      throw new AppointmentNotCreatedError()
    }

    return {
      appointment,
    }
  }
}
