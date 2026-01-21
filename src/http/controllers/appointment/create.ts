import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { AppointmentNotCreatedError } from '@/app/use-case/err/Appointment-not-created-error'
import { AppointmentAlreadyExistError } from '@/app/use-case/err/appointment-already-exist-error'
import { InvalidTimeSlotDurationError } from '@/app/use-case/err/invalid-time-slot-duration-error'
import { ServiceNotFoundError } from '@/app/use-case/err/service-not-found-error'
import { makeCreateAppointmentUseCase } from '@/app/use-case/factories/make-create-appointment-use-case'

export const createAppointment: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/appointment',
    {
      schema: {
        tags: ['Appointment'],
        summary: 'Create new appointment',
        body: z4.object({
          client: z4.string(),
          phone: z4.string(),
          date: z4.string(),
          startTime: z4.string(),
          endTime: z4.string(),
          status: z4.enum(['scheduled', 'cancelled', 'finished']),
          serviceId: z4.string(),
        }),
        response: {
          201: z4.object({
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
        const { client, phone, date, startTime, endTime, status, serviceId } =
          request.body

        const createAppointmentUseCase = makeCreateAppointmentUseCase()

        const { appointment } = await createAppointmentUseCase.execute({
          client,
          phone,
          date,
          startTime,
          endTime,
          status,
          serviceId,
        })

        return reply.status(201).send({
          appointment: appointment,
        })
      } catch (error) {
        if (error instanceof ServiceNotFoundError) {
          return reply.status(404).send({
            message: error.message,
          })
        }

        if (error instanceof AppointmentAlreadyExistError) {
          return reply.status(409).send({
            message: error.message,
          })
        }

        if (error instanceof InvalidTimeSlotDurationError) {
          return reply.status(409).send({
            message: error.message,
          })
        }

        if (error instanceof AppointmentNotCreatedError) {
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
