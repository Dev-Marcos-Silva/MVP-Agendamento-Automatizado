import type { FastifyInstance } from 'fastify'
import { createServices } from './create'
import { fetchServices } from './services'
import { updateServices } from './update'

export async function servicesRouters(app: FastifyInstance) {
  app.register(createServices)
  app.register(fetchServices)
  app.register(updateServices)
}
