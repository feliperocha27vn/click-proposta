import z from 'zod'

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
  JWT_SECRET: z.string(),
  NODE_ENV: z.string(),
  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),
  DATABASE_URL: z.string(),
  DATABASE_URL_TEST: z.string().optional(),
  BOT_SERVICE_TOKEN: z.string(),
  EVOLUTION_API_URL: z.string().url(),
  EVOLUTION_API_TOKEN: z.string(),
  APP_URL: z.string().url().default('http://localhost:5173'),
})

export const env = envSchema.parse(process.env)
