import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { AppointmentNotFoundError } from '@/app/use-case/err/appointment-not-found-error'
import { makeGetAppointmentUseCase } from '@/app/use-case/factories/make-get-appointment-use-case'

export const getAppointment: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/appointment/:id',
    {
      schema: {
        tags: ['Appointment'],
        summary: 'Get an appointment',
        params: z4.object({
          appointmentId: z4.string(),
        }),
        response: {
          200: z4.object({
            appointment: z4.object({
              id: z4.string(),
              client: z4.string(),
              phone: z4.string(),
              date: z4.string(),
              startTime: z4.string(),
              endTime: z4.string(),
              status: z4.enum(['scheduled', 'cancelled', 'finished']),
              serviceId: z4.string(),
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
        const { appointmentId } = request.params

        const getAppointmentUseCase = makeGetAppointmentUseCase()

        const { appointment } = await getAppointmentUseCase.execute({appointmentId})

        return reply.status(200).send({
          appointment: appointment
        })
      } catch (error) {
        if (error instanceof AppointmentNotFoundError) {
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
