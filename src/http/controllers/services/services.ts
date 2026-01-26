import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { makeFetchServicesUseCase } from '@/app/use-case/factories/make-fetch-services-use-case'

export const fetchServices: FastifyPluginCallbackZod = (app) => {
  app.get(
    '/services/user',
    {
      schema: {
        tags: ['Services'],
        summary: 'Fetch many services',
        response: {
          200: z4.object({
            services: z4
              .array(
                z4.object({
                  id: z4.string(),
                  name: z4.string(),
                  description: z4.string(),
                  price: z4.string(),
                }),
              )
              .nullable(),
          }),
          500: z4.object({
            message: z4.string(),
          }),
        },
      },
    },
    async (_request, reply) => {
      try {
        const getServicesUseCase = makeFetchServicesUseCase()

        const { services } = await getServicesUseCase.execute()

        return reply.status(200).send({
          services: services,
        })
      } catch (_error) {
        return reply.status(500).send({
          message: 'Internal server error',
        })
      }
    },
  )
}
