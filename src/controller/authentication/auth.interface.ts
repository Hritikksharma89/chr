import { Document } from 'mongoose'

export interface IToken {
  token: string
  expires: Date
}

// Interface for tokens
export interface ITokens {
  refresh: IToken
  access: IToken
}

// Interface for authentication
export interface IAuth {
  email: string
  password: string
}

export interface IAuthDoc extends IAuth, Document {}
