import { z } from 'zod'

const AuthValidation = {
  signUp: {
    body: z.object({
      email: z.string(),
      name: z.string().optional(),
      passwordHash: z.string().min(8),
    }),
    query: z.object({}),
    params: z.object({}),
  },
  signIn: {
    body: z.object({
      email: z.string(),
      password: z.string().min(8),
    }),
    query: z.object({}),
    params: z.object({}),
  },
  resetAuthPass: {
    body: z.object({
      newPassword: z.string().min(8),
      password: z.string().min(8),
    }),
    query: z.object({}),
    params: z.object({}),
  },
}

export default AuthValidation
