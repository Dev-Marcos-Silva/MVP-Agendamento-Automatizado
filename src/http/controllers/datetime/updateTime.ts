import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { DateTimeNotFoundError } from '@/app/use-case/err/date-time-not-found-error'
import { makeEditTimeUseCase } from '@/app/use-case/factories/make-edit-time-use-case'

export const updateTime: FastifyPluginCallbackZod = (app) => {
  app.patch(
    '/datetime/time',
    {
      schema: {
        tags: ['DateTime'],
        summary: 'Update time',
        body: z4.object({
          dateTimeId: z4.string(),
          startTime: z4.string(),
          endTime: z4.string(),
        }),
        response: {
          200: z4.object({
            dateTime: z4.object({
              id: z4.string(),
              accountId: z4.string(),
              day: z4.string(),
              startTime: z4.string(),
              endTime: z4.string(),
              dayStatus: z4.enum(['true', 'false']),
            }),
          }),
          404: z4.object({
            message: z4.string(),
          }),
          500: z4.object({
            message: z4.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { dateTimeId, startTime, endTime } = request.body

        const editTimeUseCase = makeEditTimeUseCase()

        const { newDateTime } = await editTimeUseCase.execute({
          dateTimeId,
          startTime,
          endTime,
        })

        return reply.status(200).send({
          dateTime: newDateTime,
        })
      } catch (error) {
        if (error instanceof DateTimeNotFoundError) {
          return reply.status(404).send({
            message: error.message,
          })
        }

        return reply.status(500).send({
          message: 'Internal server error',
        })
      }
    },
  )
}
