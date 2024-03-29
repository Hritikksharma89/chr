import mongoose from "mongoose"
import { UserDoc } from "../user/user.interface"
import { EventDoc } from "../event/event.interface"
import { z } from "zod"
import { churchZodSchema, createChurchDto, updateChurchDto } from "./church.validation"

export interface ChurchDoc extends Document {
  _id?: StringConstructor
  name: string
  address?: string
  city?: string
  state?: string
  zipCode: number
  socialMediaProfile?: string
  description?: string
  imageUrl?: string
  events: mongoose.Types.Array<EventDoc['_id']>
  createdBy: UserDoc['_id']
}


export type Church = z.infer<typeof churchZodSchema>
export type CreateChurchDto = z.infer<typeof createChurchDto>
export type UpdateChurchDto = z.infer<typeof updateChurchDto>