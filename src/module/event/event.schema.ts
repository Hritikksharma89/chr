import mongoose, { Schema } from 'mongoose'
import { EventDoc } from './event.interface'
 
const eventSchema = new Schema<EventDoc>({
  name: { type: String, required: true },
  address: { type: String },
  eventDate: { type: Date, required: true },
  description: { type: String },
  imageUrl: { type: String },
  church: { type: Schema.Types.ObjectId, ref: 'Church', required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const Event = mongoose.model<EventDoc>('Event', eventSchema)

export { Event }
