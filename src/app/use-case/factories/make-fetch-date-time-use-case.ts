import { AppointmentPrismaRepositories } from '@/app/repositories/prisma/appointment-prisma-repositories'
import { DateTimePrismaRepositories } from '@/app/repositories/prisma/datetime-prisma-repositories'
import { FetchDateTimeUseCase } from '../fetch-date-time'

export function makeFetchDateTimeUseCase() {
  const dateTimeRepository = new DateTimePrismaRepositories()

  const appointmentRepository = new AppointmentPrismaRepositories()

  const fetchDateTimeUseCase = new FetchDateTimeUseCase(
    dateTimeRepository,
    appointmentRepository,
  )

  return fetchDateTimeUseCase
}
