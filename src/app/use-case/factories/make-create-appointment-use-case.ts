import { AppointmentPrismaRepositories } from '@/app/repositories/prisma/appointment-prisma-repositories'
import { DateTimePrismaRepositories } from '@/app/repositories/prisma/datetime-prisma-repositories'
import { ServicesPrismaRepositories } from '@/app/repositories/prisma/services-prisma-repositories'
import { CreateAppointmentUseCase } from '../create-appointment'

export function makeCreateAppointmentUseCase() {
  const appointmentRepository = new AppointmentPrismaRepositories()

  const servicesRepository = new ServicesPrismaRepositories()

  const dateTimeRepository = new DateTimePrismaRepositories()

  const createAppointmentUseCase = new CreateAppointmentUseCase(
    appointmentRepository,
    servicesRepository,
    dateTimeRepository,
  )

  return createAppointmentUseCase
}
