import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { AccountAlreadyExistError } from '@/app/use-case/err/account-already-exist-error'
import { makeCreateAccountUseCase } from '@/app/use-case/factories/make-create-account-use-case'

export const createAccount: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/user',
    {
      schema: {
        tags: ['Account'],
        summary: 'Create new account',
        body: z4.object({
          name: z4.string(),
          email: z4.string().email(),
          password: z4.string().min(6),
        }),
        response: {
          201: z4.object({
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
        const { name, email, password } = request.body

        const createAccountUseCase = makeCreateAccountUseCase()

        await createAccountUseCase.execute({ name, email, password })

        return reply.status(201).send({
          message: 'Conta criada com sucesso',
        })
      } catch (error) {
        if (error instanceof AccountAlreadyExistError) {
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
