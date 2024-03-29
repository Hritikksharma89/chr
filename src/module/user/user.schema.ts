import mongoose, { Schema } from 'mongoose'
import { UserDoc } from './user.interface'

const userSchema = new Schema<UserDoc>({
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
  otp: [{ type: Schema.Types.ObjectId, ref: 'Otp' }],
  tokens: [{ type: Schema.Types.ObjectId, ref: 'Token' }],
})

const User = mongoose.model<UserDoc>('User', userSchema)

export { User, UserDoc }
