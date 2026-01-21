import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { AppointmentNotFoundError } from '@/app/use-case/err/appointment-not-found-error'
import { makeEditAppointmentUseCase } from '@/app/use-case/factories/make-edit-appointment-use-case'

export const updateAppointment: FastifyPluginCallbackZod = (app) => {
  app.patch(
    '/appointment/update',
    {
      schema: {
        tags: ['Appointment'],
        summary: 'Update an appointment',
        body: z4.object({
          appointmentId: z4.string(),
          status: z4.enum(['scheduled', 'cancelled', 'finished']),
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
        const { appointmentId, status } = request.body

        const editAppointmentUseCase = makeEditAppointmentUseCase()

        const { newAppointment } = await editAppointmentUseCase.execute({
          appointmentId,
          status,
        })

        return reply.status(200).send({
          appointment: newAppointment,
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
