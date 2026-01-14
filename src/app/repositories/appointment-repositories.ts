import type { Appointment, Prisma } from '@prisma/client'

export interface AppointmentRepository {

  createAppointment(data: Prisma.AppointmentCreateInput): Promise<Appointment | null>

  findById(appointmentId: string): Promise<Appointment | null>

  findByMany(): Promise<Appointment[]>

  findAppointment(
    date: string,
    startTime: string,
    endTime: string
  ): Promise<Appointment | null>

  updateAppointment(appointment: Appointment): Promise<Appointment | null>
}
