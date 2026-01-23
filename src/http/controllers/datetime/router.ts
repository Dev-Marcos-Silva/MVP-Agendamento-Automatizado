import type { FastifyInstance } from 'fastify'
import { createDateTime } from './create'
import { fetchDateTime } from './datetimes'
import { updateDate } from './updateDate'
import { updateTime } from './updateTime'

export async function dateTimeRouters(app: FastifyInstance) {
  app.register(createDateTime)
  app.register(updateDate)
  app.register(updateTime)
  app.register(fetchDateTime)
}
