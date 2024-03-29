import { z } from 'zod'

const userFields = {
  name: z.string(),
  email: z.string().email(),
  isEmailVerified: z.boolean(),
  phoneNumber: z.number().optional(),
  biography: z.string().optional(),
  role: z.enum(['USER', 'ADMIN']),
  dateOfBirth: z.date().nullable(),
  preferredLanguage: z.string().optional(),
  events: z.array(z.string()).optional(),
  churches: z.array(z.string()).optional(),
  profileImageUrl: z.string().optional(),
  passwordHash: z.string(),
  otp: z.array(z.string()).optional(),
}

const userZodSchema = z.object(userFields)

const createUserDto = z.object(userFields)

const updateUserDto = z.object({
  ...userFields,
  name: z.string().optional(),
  email: z.string().email().optional(),
  isEmailVerified: z.boolean().optional(),
  role: z.enum(['USER', 'ADMIN']).optional(),
  dateOfBirth: z.date().nullable().optional(),
})

export { userZodSchema, createUserDto, updateUserDto }
