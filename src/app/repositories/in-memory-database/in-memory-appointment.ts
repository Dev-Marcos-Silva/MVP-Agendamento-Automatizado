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

  async findById(appointmentId: string) {

    const appointment = this.items.find(item => item.id === appointmentId)

    if(!appointment){
      return null
    }

    return appointment
    
  }

  async findByMany() {

    const appointments = this.items
    
    return appointments
    
  }

  async findAppointment(date: string, startTime: string, endTime: string) {

    const appointment = this.items.find(item => 
      item.date === date && 
      item.startTime === startTime && 
      item.endTime === endTime
    )

    if(!appointment){
      return null
    }

    return appointment
  }


  async updateAppointment(appointment: Appointment) {

    const appointmentIndex = this.items.findIndex(item => item.id === appointment.id)

    this.items[appointmentIndex] = appointment

    const newAppointment = this.items.find(item => item.id === appointment.id)

    if(!newAppointment){
      return null
    }

    return newAppointment
    
  } 
}

