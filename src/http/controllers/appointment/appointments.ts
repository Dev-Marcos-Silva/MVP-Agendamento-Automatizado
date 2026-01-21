import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { AccountNotFoundError } from '@/app/use-case/err/account-not-found-error'
import { makeFetchAppointmentUseCase } from '@/app/use-case/factories/make-fetch-appointment-use-case'

export const fetchAppointment: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/appointment/account/:id',
    {
      schema: {
        tags: ['Appointment'],
        summary: 'Fetch many appointment',
        params: z4.object({
          accountId: z4.string(),
        }),
        response: {
          200: z4.object({
            appointments: z4.array(
              z4.object({
                id: z4.string(),
                client: z4.string(),
                phone: z4.string(),
                date: z4.string(),
                startTime: z4.string(),
                endTime: z4.string(),
                status: z4.enum(['scheduled', 'cancelled', 'finished']),
                serviceId: z4.string(),
            })),
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
        const { accountId } = request.params

        const fetchAppointmentUseCase = makeFetchAppointmentUseCase()

        const { appointments } = await fetchAppointmentUseCase.execute({accountId})

        return reply.status(200).send({
          appointments: appointments
        })
      } catch (error) {
        if (error instanceof AccountNotFoundError) {
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
