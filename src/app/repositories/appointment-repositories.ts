import type { Appointment, Prisma } from '@prisma/client'

export interface AppointmentRepository {

  createAppointment(data: Prisma.AppointmentCreateInput): Promise<Appointment | null>
}
