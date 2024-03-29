import mongoose from 'mongoose'

export const authSchema = new mongoose.Schema({
  email: { type: String, required: true },
  passwordHash: { type: String, required: true },
  token: {
    access: { expires: { type: Date }, token: { type: String } },
    refresh: { expires: { type: Date }, token: { type: String } },
  },
  userId: { type: String, required: true },
})
