import mongoose, { Document } from 'mongoose'
import { Role } from './user.constant'
import { createUserDto, updateUserDto, userZodSchema } from './user.validation'
import { z } from 'zod'
import { EventDoc } from '../event/event.interface'
import { ChurchDoc } from '../church/church.interface'
import { OtpDoc } from '../otp/otp.interface'
import { TokenDoc } from '../token/token.interface'

export interface UserDoc extends Document {
  name: string
  email: string
  isEmailVerified: boolean
  phoneNumber?: number
  biography?: string
  role: Role
  dateOfBirth?: Date
  preferredLanguage?: string
  events: mongoose.Types.Array<EventDoc['_id']>
  churches: mongoose.Types.Array<ChurchDoc['_id']>
  profileImageUrl?: string
  passwordHash: string
  otp: mongoose.Types.Array<OtpDoc['_id']>
  tokens: mongoose.Types.Array<TokenDoc['_id']>
}

export type UpdateUserDto = z.infer<typeof updateUserDto>
export type CreateUserDto = z.infer<typeof createUserDto>
export type User = z.infer<typeof userZodSchema>
