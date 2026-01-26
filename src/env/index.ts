import 'dotenv/config'
import z4 from 'zod/v4'

const schemaEnv = z4.object({
  JWT_SECRET: z4.string(),
  DATABASE_URL: z4.string(),
  GEMINI_API_KEY: z4.string(),
})

const envSchema = schemaEnv.safeParse(process.env)

if (envSchema.success === false) {
  console.error('❌ Invalid enviromente variables', envSchema.error.format)

  throw new Error('❌ Invalid enviromente variables')
}

export const env = envSchema.data
