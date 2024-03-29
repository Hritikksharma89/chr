import { z } from "zod"
import { UserDoc } from "../user/user.interface"
import { createEventDto, eventZodSchema, updateEventDto } from "./event.validation"
import { Document } from "mongodb"
import { ChurchDoc } from "../church/church.interface"

export interface EventDoc extends Document {
  name: string
  address?: string
  eventDate: Date
  description?: string
  imageUrl?: string
  church: ChurchDoc['_id']
  createdBy: UserDoc['_id']
}


export type Event = z.infer<typeof eventZodSchema>
export type CreateEventDto = z.infer<typeof createEventDto>
export type UpdateEventDto = z.infer<typeof updateEventDto>
