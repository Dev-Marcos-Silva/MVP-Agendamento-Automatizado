import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { AccountNotFoundError } from '@/app/use-case/err/account-not-found-error'
import { DateTimeNotCreatedError } from '@/app/use-case/err/date-time-not-created-error'
import { makeCreateDateTimeUseCase } from '@/app/use-case/factories/make-create-date-time-use-case'

export const createDateTime: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/datetime',
    {
      schema: {
        tags: ['DateTime'],
        summary: 'Create new datetime',
        body: z4.object({
          accountId: z4.string(),
          day: z4.string(),
          startTime: z4.string(),
          endTime: z4.string(),
          dayStatus: z4.enum(['true', 'false']),
        }),
        response: {
          201: z4.object({
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
          409: z4.object({
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
        const { accountId, day, startTime, endTime, dayStatus } = request.body

        const createDateTimeUseCase = makeCreateDateTimeUseCase()

        const { dateTime } = await createDateTimeUseCase.execute({
          accountId,
          day,
          startTime,
          endTime,
          dayStatus,
        })

        return reply.status(201).send({
          dateTime: dateTime,
        })
      } catch (error) {
        if (error instanceof AccountNotFoundError) {
          return reply.status(404).send({
            message: error.message,
          })
        }

        if (error instanceof DateTimeNotCreatedError) {
          return reply.status(409).send({
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
