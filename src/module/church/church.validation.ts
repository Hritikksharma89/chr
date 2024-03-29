import { z } from 'zod'

const churchFields = {
  name: z.string(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.number(),
  socialMediaProfile: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  events: z.array(z.string()).optional(),
  createdBy: z.string(),
}

const churchZodSchema = z.object(churchFields)

const createChurchDto = z.object(churchFields)

const updateChurchDto = z.object({
  ...churchFields,
  name: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipCode: z.number().optional(),
  socialMediaProfile: z.string().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  events: z.array(z.string()).optional(),
  createdBy: z.string().optional(),
})

export { churchZodSchema, createChurchDto, updateChurchDto }
