import type { FastifyInstance } from 'fastify'
import { authenticationAccout } from './authentication'
import { createAccount } from './create'

export async function accountRouters(app: FastifyInstance) {
  app.register(createAccount)
  app.register(authenticationAccout)
}
