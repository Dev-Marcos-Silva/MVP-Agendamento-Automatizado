import { AppointmentPrismaRepositories } from '@/app/repositories/prisma/appointment-prisma-repositories'
import { DateTimePrismaRepositories } from '@/app/repositories/prisma/datetime-prisma-repositories'
import { GetDateTimeUseCase } from '../get-date-time'

export function makeGetDateTimeUseCase() {
  const dateTimeRepository = new DateTimePrismaRepositories()

  const appointmentRepository = new AppointmentPrismaRepositories()

  const getDateTimeUseCase = new GetDateTimeUseCase(
    dateTimeRepository,
    appointmentRepository,
  )

  return getDateTimeUseCase
}
