import { randomUUID } from 'node:crypto'
import type { Appointment, Prisma } from '@prisma/client'
import type { AppointmentRepository } from '../appointment-repositories'

export class InMemoryAppointmentRepository implements AppointmentRepository {
  public items: Appointment[] = []

  async createAppointment({
    id,
    client,
    phone,
    date,
    startTime,
    endTime,
    status,
    service,
  }: Prisma.AppointmentCreateInput) {
    const serviceId = service.connect?.id

    if (!serviceId) {
      return null
    }

    if (!date || typeof date === 'string') {
      return null
    }

    if (!status) {
      return null
    }

    const appointment = {
      id: id ?? randomUUID(),
      client,
      phone,
      date,
      startTime,
      endTime,
      status,
      serviceId,
    }

    this.items.push(appointment)

    return appointment
  }
}
