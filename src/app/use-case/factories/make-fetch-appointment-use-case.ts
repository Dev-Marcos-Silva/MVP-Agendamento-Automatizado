import { AccountPrismaRepositories } from '@/app/repositories/prisma/account-prisma-repositories'
import { AppointmentPrismaRepositories } from '@/app/repositories/prisma/appointment-prisma-repositories'
import { FetchAppointmentUseCase } from '../fetch-appointment'

export function makeFetchAppointmentUseCase() {
  const appointmentRepository = new AppointmentPrismaRepositories()

  const accountRepository = new AccountPrismaRepositories()

  const fetchAppointmentUseCase = new FetchAppointmentUseCase(
    appointmentRepository,
    accountRepository,
  )

  return fetchAppointmentUseCase
}
