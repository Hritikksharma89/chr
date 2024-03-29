import mongoose, { Document, Schema } from 'mongoose'
import { ChurchDoc } from './church.interface'

const churchSchema = new Schema<ChurchDoc>({
  name: { type: String, required: true },
  address: { type: String },
  city: { type: String },
  state: { type: String },
  zipCode: { type: Number, required: true },
  socialMediaProfile: { type: String },
  description: { type: String },
  imageUrl: { type: String },
  events: [{ type: Schema.Types.ObjectId, ref: 'Event' }],
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const Church = mongoose.model<ChurchDoc>('Church', churchSchema)

export { Church }
