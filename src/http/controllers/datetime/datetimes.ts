import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { makeFetchDateTimeUseCase } from '@/app/use-case/factories/make-fetch-date-time-use-case'

const TimeSlot = z4.object({
  start: z4.string(),
  end: z4.string(),
})

export const fetchDateTime: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/datetime/user',
    {
      schema: {
        tags: ['DateTime'],
        summary: 'Fetch many datetimes',
        response: {
          200: z4.object({
            dateTime: z4.array(z4.object({
              date: z4.string(),
              status: z4.enum(['true', 'false']),
              times: z4.array(TimeSlot),
            })).nullable(),
          }),
          500: z4.object({
            message: z4.string(),
          }),
        },
      },
    },
    async (_request, reply) => {
      try {

        const getDateTimeUseCase = makeFetchDateTimeUseCase()

        const { dateTime } = await getDateTimeUseCase.execute()

        return reply.status(200).send({
          dateTime: dateTime
        })
      } catch (_error) {

        return reply.status(500).send({
          message: 'Internal server error',
        })
      }
    },
  )
}
