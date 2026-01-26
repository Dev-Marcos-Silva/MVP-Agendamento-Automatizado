import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { DateTimeNotFoundError } from '@/app/use-case/err/date-time-not-found-error'
import { makeEditDateUseCase } from '@/app/use-case/factories/make-edit-date-use-case'
import { jwtVerify } from '@/http/middlewares/verify-jwt'

export const updateDate: FastifyPluginCallbackZod = (app) => {
  app.patch(
    '/datetime/date',
    {
      preHandler: [jwtVerify],
      schema: {
        tags: ['DateTime'],
        summary: 'Update date',
        body: z4.object({
          dateTimeId: z4.string(),
          dayStatus: z4.enum(['true', 'false']),
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
        const { dateTimeId, dayStatus } = request.body

        const editDateUseCase = makeEditDateUseCase()

        const { newDateTime } = await editDateUseCase.execute({
          dateTimeId,
          dayStatus,
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
