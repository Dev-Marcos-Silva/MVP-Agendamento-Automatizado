import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { AccountNotFoundError } from '@/app/use-case/err/account-not-found-error'
import { ServiceNotCreatedError } from '@/app/use-case/err/service-not-created-error'
import { makeCreateServicesUseCase } from '@/app/use-case/factories/make-create-services-use-case'
import { jwtVerify } from '@/http/middlewares/verify-jwt'

export const createServices: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/services',
    {
      preHandler: [jwtVerify],
      schema: {
        tags: ['Services'],
        summary: 'Create new services',
        body: z4.object({
          accountId: z4.string(),
          name: z4.string(),
          description: z4.string(),
          price: z4.string(),
        }),
        response: {
          201: z4.object({
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
        const { accountId, name, description, price } = request.body

        const createServicesUseCase = makeCreateServicesUseCase()

        const { services } = await createServicesUseCase.execute({
          accountId,
          name,
          description,
          price,
        })

        return reply.status(201).send({
          services: services,
        })
      } catch (error) {
        if (error instanceof AccountNotFoundError) {
          return reply.status(404).send({
            message: error.message,
          })
        }

        if (error instanceof ServiceNotCreatedError) {
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
