import { z } from 'zod'
import { createOtpDto, otpSchema, updateOtpDto } from './otp.validation'
import { UserDoc } from '../user/user.interface'
import { OtpType } from './otp.constant'
import { Document } from 'mongodb'

export interface OtpDoc extends Document {
  user: UserDoc['_id']
  type: OtpType
  code: number
}

export type Otp = z.infer<typeof otpSchema>

export type CreateOtpDto = z.infer<typeof createOtpDto>

export type UpdateOtpDto = z.infer<typeof updateOtpDto>

 