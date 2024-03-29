import { z } from 'zod'

const tokenSchema = z.object({
  type: z.string(),
  expireAt: z.date(),
  token: z.string().nullable(),
})


const combinedSchema = z.object({
  access: tokenSchema.nullable(),
  refresh: tokenSchema.nullable(),
  resetPassword: tokenSchema.nullable(),
  verifyEmail: tokenSchema.nullable(),
})

export { combinedSchema }
