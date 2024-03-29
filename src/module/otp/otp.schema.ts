import mongoose, { Schema } from 'mongoose'
import { OtpDoc } from './otp.interface'

const otpSchema = new Schema<OtpDoc>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, enum: ['RESET', 'VERIFY', 'FORGOT'], required: true },
  code: { type: Number, required: true },
})

const Otp = mongoose.model<OtpDoc>('Otp', otpSchema)

export { Otp, OtpDoc }
