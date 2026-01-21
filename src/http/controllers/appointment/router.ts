import type { FastifyInstance } from 'fastify'
import { getAppointment } from './appointment'
import { fetchAppointment } from './appointments'
import { createAppointment } from './create'
import { updateAppointment } from './update'

export async function appointmentRouters(app: FastifyInstance) {
  app.register(createAppointment)
  app.register(updateAppointment)
  app.register(getAppointment)
  app.register(fetchAppointment)
}
