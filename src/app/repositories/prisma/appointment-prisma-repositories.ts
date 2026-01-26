import type { Appointment, Prisma } from '@prisma/client'
import { prisma } from '@/lib/prisma'
import type { AppointmentRepository } from '../appointment-repositories'

export class AppointmentPrismaRepositories implements AppointmentRepository {
  async createAppointment(data: Prisma.AppointmentCreateInput) {
    const appointment = await prisma.appointment.create({ data })

    return appointment
  }

  async findAppointment(date: string, startTime: string, endTime: string) {
    const appointment = await prisma.appointment.findFirst({
      where: {
        date,
        startTime,
        endTime,
      },
    })

    return appointment
  }

  async findById(appointmentId: string) {
    const appointment = await prisma.appointment.findUnique({
      where: {
        id: appointmentId,
      },
    })

    return appointment
  }

  async findByMany() {
    const appointments = await prisma.appointment.findMany()

    return appointments
  }

  async updateAppointment(appointment: Appointment) {
    const { id, status } = appointment

    const newAppointment = await prisma.appointment.update({
      where: {
        id,
      },
      data: {
        status,
      },
    })

    return newAppointment
  }
}
