import { NextFunction, Request, Response } from 'express'
import { verifyToken } from '../module/token/token.factory'
import { tokenTypes } from '../core/constant'
import { User } from '../module/user/user.schema'
import { Responses } from '../core/common/response'
import { logger } from '../core/log/log'
import { Token } from '../module/token/token.schema'
import { Token, TokenBase, TokenDoc } from '../module/token/token.interface'

const tokenValidate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    logger.info('Starting token validation middleware')

    if (!req.headers.authorization) {
      logger.info('Authorization header missing')
      return Responses(res, 'Authorization header missing')
    }
    const token = req.headers.authorization
    if (!token) {
      logger.info('Token not provided')
      return Responses(res, 'Token not provided')
    }

    logger.info('Token:', token)

    const verifiedToken = verifyToken(token)
    if (!verifiedToken || verifiedToken.type !== tokenTypes.ACCESS) {
      logger.info('Invalid access token')
      return Responses(res, 'Invalid access token')
    }

    const userId = verifiedToken.userId
    logger.info('User ID from token:', userId)

    const GetToken: any = await Token.find({ user: userId })
    if (!GetToken || GetToken.token != token) {
      logger.info('Invalid token', GetToken?.token)
      return Responses(res, 'Invalid token', { token: GetToken?.token })
    }

    logger.info('Token validation successful')
    next()
  } catch (error) {
    logger.error('Error in token validation middleware:', error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

export default tokenValidate
