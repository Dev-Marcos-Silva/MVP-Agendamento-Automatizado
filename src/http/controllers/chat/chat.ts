import type { FastifyPluginCallbackZod } from 'fastify-type-provider-zod'
import z4 from 'zod/v4'
import { aiInterpretation } from '@/app/services/ai/aiInterpretation'
import { aiPresenter } from '@/app/services/ai/aiPresenter'
import { aiDispatcher } from '@/app/services/ai/dispatcher'

export const aiChatController: FastifyPluginCallbackZod = (app) => {
  app.post(
    '/chat/ai',
    {
      schema: {
        tags: ['Ai'],
        summary: 'AI chat for appointment interpretation',
        body: z4.object({
          message: z4.string(),
        }),
        response: {
          200: z4.object({
            response: z4.string(),
          }),
          500: z4.object({
            message: z4.string(),
          }),
        },
      },
    },
    async (request, reply) => {
      try {
        const { message } = request.body

        const { data, intent } = await aiInterpretation(message)

        const result = await aiDispatcher({intent, data})

        const response = await aiPresenter(result)

        return reply.status(200).send({
          response
        })
      } catch (error) {
        return reply.status(500).send({
          message: `AI processing failed ${error}`,
        })
      }
    }
  )
}
