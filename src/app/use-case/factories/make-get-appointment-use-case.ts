import { AppointmentPrismaRepositories } from '@/app/repositories/prisma/appointment-prisma-repositories'
import { GetAppointmentUseCase } from '../get-appointment'

export function makeGetAppointmentUseCase() {
  const appointmentRepository = new AppointmentPrismaRepositories()

  const getAppointmentUseCase = new GetAppointmentUseCase(appointmentRepository)

  return getAppointmentUseCase
}
