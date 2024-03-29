import jwt from 'jsonwebtoken'
import moment from 'moment'
import { env } from '../../core/environment/environment'
import { Payload, TokenFactory, TokenPayload } from './token.interface'
import { tokenTypes } from './token.constant'

const payload: Payload = (id, role, expires, type) => ({
  exp: expires.unix(),
  iat: moment().unix(),
  role,
  userId: id,
  type,
})

const SECRET: string = env.JWT_SECRET!
const ACCESS_EXPIRATION: string = env.JWT_ACCESS_EXPIRATION_MINUTES!
const REFRESH_EXPIRATION: string = env.JWT_REFRESH_EXPIRATION_DAYS!

const TokenFactory = (): TokenFactory => ({
  accessExpire: moment().add(ACCESS_EXPIRATION, 'minutes'),

  generate: (id, role, expires, type) => jwt.sign(payload(id, role, expires, type), SECRET),

  refreshExpire: moment().add(REFRESH_EXPIRATION, 'days'),

  verify: (token) => jwt.verify(token, SECRET) as TokenPayload,
})

export default TokenFactory

export const generateAuthTokens = async (id: string, role: string) => {
  return {
    access: {
      expires: TokenFactory().accessExpire.toDate(),
      token: TokenFactory().generate(id, role, TokenFactory().accessExpire, tokenTypes.ACCESS),
    },
    refresh: {
      expires: TokenFactory().refreshExpire.toDate(),
      token: TokenFactory().generate(id, role, TokenFactory().refreshExpire, tokenTypes.REFRESH),
    },
  }
}

export const verifyToken = (token: string) => TokenFactory().verify(token.split(' ')[1])

export const generateRegisterVerificationTokens = async (id: string, role: string) => {
  return {
    access: {
      expires: TokenFactory().accessExpire.toDate(),
      token: TokenFactory().generate(
        id,
        role,
        TokenFactory().accessExpire,
        tokenTypes.VERIFY_EMAIL,
      ),
    },
  }
}

export const generateForgotVerificationToken = async (id: string, role: string) => {
  return {
    access: {
      expires: TokenFactory().accessExpire.toDate(),
      token: TokenFactory().generate(
        id,
        role,
        TokenFactory().accessExpire,
        tokenTypes.RESET_PASSWORD,
      ),
    },
  }
}
