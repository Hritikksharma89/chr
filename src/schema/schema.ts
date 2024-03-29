import mongoose, { Document, Schema } from 'mongoose'
import { z } from 'zod'

enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

enum OtpType {
  RESET = 'RESET',
  VERIFY = 'VERIFY',
  FORGOT = 'FORGOT',
}

// Mongoose User Schema
interface UserDoc extends Document {
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
  otps: mongoose.Types.Array<OtpDoc['_id']>
}

export const userSchema = new Schema<UserDoc>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  isEmailVerified: { type: Boolean, default: false },
  phoneNumber: { type: Number },
  biography: { type: String },
  role: { type: String },
  dateOfBirth: { type: Date },
  preferredLanguage: { type: String },
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  churches: [{ type: Schema.Types.ObjectId, ref: 'Church' }],
  profileImageUrl: { type: String },
  passwordHash: { type: String, required: true },
  otps: [{ type: Schema.Types.ObjectId, ref: 'Otp' }],
})

const User = mongoose.model<UserDoc>('User', userSchema)

// Mongoose Otp Schema
interface OtpDoc extends Document {
  user: UserDoc['_id']
  type: OtpType
  code: number
}

const otpSchema = new Schema<OtpDoc>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['RESET', 'VERIFY', 'FORGOT'], required: true },
  code: { type: Number, required: true },
})

const Otp = mongoose.model<OtpDoc>('Otp', otpSchema)

// Mongoose Church Schema
interface ChurchDoc extends Document {
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

export const churchSchema = new Schema<ChurchDoc>({
  name: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: Number, required: true },
  socialMediaProfile: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: false },
})

const Church = mongoose.model<ChurchDoc>('Church', churchSchema)

// Mongoose Event Schema
interface EventDoc extends Document {
  name: string
  address?: string
  eventDate: Date
  description?: string
  imageUrl?: string
  church: ChurchDoc['_id']
  createdBy: UserDoc['_id']
}

export const eventSchema = new Schema<EventDoc>({
  name: { type: String, required: true },
  address: { type: String },
  eventDate: { type: Date, required: true },
  description: { type: String },
  imageUrl: { type: String },
  church: { type: Schema.Types.ObjectId, ref: 'Church', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const Event = mongoose.model<EventDoc>('Event', eventSchema)

// Zod Schema
const userZodSchema = z.object({
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
  otps: z.array(z.string()).optional(),
})

const otpZodSchema = z.object({
  user: z.string(),
  type: z.enum(['RESET', 'VERIFY', 'FORGOT']),
  code: z.number(),
})

const churchZodSchema = z.object({
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
})

const eventZodSchema = z.object({
  name: z.string(),
  address: z.string().optional(),
  eventDate: z.date(),
  description: z.string().optional(),
  imageUrl: z.string().optional(),
  church: z.string(),
  createdBy: z.string(),
})

export { User, Otp, Church, Event, userZodSchema, otpZodSchema, churchZodSchema, eventZodSchema }
