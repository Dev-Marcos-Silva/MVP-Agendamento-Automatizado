import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { InvalidCredentialsError } from '@/app/use-case/err/invalid-crendentials-error'
import { makeAuthenticationUseCase } from '@/app/use-case/factories/make-authentication-use-case'

export const authenticationAccout: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/authentication',
    {
      schema: {
        tags: ['Account'],
        summary: 'Authentication with an account',
        body: z4.object({
          email: z4.string().email(),
          password: z4.string().min(6),
        }),
        response: {
          200: z4.object({
            token: z4.string(),
          }),
          401: z4.object({
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
        const { email, password } = request.body

        const authenticationUseCase = makeAuthenticationUseCase()

        const { account } = await authenticationUseCase.execute({
          email,
          password,
        })

        const token = await reply.jwtSign(
          {},
          {
            sign: {
              sub: account.id,
              expiresIn: '7d',
            },
          },
        )

        return reply.status(200).send({
          token,
        })
      } catch (error) {
        if (error instanceof InvalidCredentialsError) {
          return reply.status(401).send({
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
