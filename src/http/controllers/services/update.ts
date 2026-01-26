import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { ServiceNotFoundError } from '@/app/use-case/err/service-not-found-error'
import { makeEditServicesUseCase } from '@/app/use-case/factories/make-edit-services-use-case'
import { jwtVerify } from '@/http/middlewares/verify-jwt'

export const updateServices: FastifyPluginCallbackZod = (app) => {
  app.patch(
    '/services',
    {
      preHandler: [jwtVerify],
      schema: {
        tags: ['Services'],
        summary: 'Update services',
        body: z4.object({
          servicesId: z4.string(),
          name: z4.string(),
          description: z4.string(),
          price: z4.string(),
        }),
        response: {
          200: z4.object({
            services: z4.object({
              id: z4.string(),
              accountId: z4.string(),
              name: z4.string(),
              description: z4.string(),
              price: z4.string(),
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
        const { servicesId, name, description, price } = request.body

        const editServicesUseCase = makeEditServicesUseCase()

        const { newServices } = await editServicesUseCase.execute({
          servicesId,
          name,
          description,
          price,
        })

        return reply.status(200).send({
          services: newServices,
        })
      } catch (error) {
        if (error instanceof ServiceNotFoundError) {
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
