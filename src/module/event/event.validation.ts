import { z } from 'zod'

const eventFields = {
  name: z.string(),
  address: z.string().optional(),
  eventDate: z.date(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  church: z.string(),
  createdBy: z.string(),
}

const eventZodSchema = z.object(eventFields)

const createEventDto = z.object(eventFields)

const updateEventDto = z.object({
  ...eventFields,
  name: z.string().optional(),
  address: z.string().optional(),
  eventDate: z.date().optional(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  church: z.string().optional(),
  createdBy: z.string().optional(),
})

export { eventZodSchema, createEventDto, updateEventDto }
