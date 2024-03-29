import { Document, Schema } from 'mongoose'
import { TokenType } from './token.constant'
import { Moment } from 'moment'
interface Token {
  type: TokenType
  expireAt: Date
  token?: string | null
}
export interface TokenBase {
  user: Schema.Types.ObjectId
  type: TokenType
  expireAt: Date
  token?: string | null
}

interface TokenDoc extends Document {
  user: Schema.Types.ObjectId
}

interface TokenPayload {
  exp: number
  iat: number
  role: string
  userId: string
  type: string
}

type Payload = (id: string, role: string, expires: Moment, type: string) => TokenPayload

interface TokenFactory {
  accessExpire: Moment
  generate: (id: string, role: string, expires: Moment, type: string) => string
  refreshExpire: Moment
  verify: (token: string) => TokenPayload
}

export { Token, TokenDoc, TokenPayload, Payload, TokenFactory }
