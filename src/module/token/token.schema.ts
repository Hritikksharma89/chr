import mongoose, { Schema } from 'mongoose'
import { TokenDoc } from './token.interface'
 
const TokenSchema = new Schema<TokenDoc>({
  type: { type: String, required: true },
  expireAt: { type: Date, required: true },
  token: { type: String },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
})

const Token = mongoose.model<TokenDoc>('Token', TokenSchema)

export { TokenDoc,Token }
