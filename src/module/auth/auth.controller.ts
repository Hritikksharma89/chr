import { Request, Response } from 'express'
import CryptoFactory from '../../core/common/crypto'
import { User, UserDoc } from '../user/user.schema'
import { Responses } from '../../core/common/response'
import {
  generateAuthTokens,
  generateForgotVerificationToken,
  generateRegisterVerificationTokens,
  verifyToken,
} from '../token/token.factory'
import { tokenTypes } from '../token/token.constant'
import { Token } from '../token/token.schema'
import { sendResetPasswordEmail, sendSuccessfulRegistration } from '../email/email.services'

const { comparePassword, encryptedPassword } = CryptoFactory()

export const signUpController = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body
    let user: UserDoc | null = await User.findOne({ email })
    if (user) {
      return Responses(res, 'User already exists. Please use a different email.')
    }
    const newUser = await User.create({
      name,
      email,
      isEmailVerified: false,
      passwordHash: encryptedPassword(password),
      role: 'USER',
    })
    const token = await generateRegisterVerificationTokens(newUser._id, newUser.role)
    await Token.create({
      user: newUser._id,
      type: tokenTypes.VERIFY_EMAIL,
      expireAt: token.access.expires,
      token: token.access.token,
    })
    await sendSuccessfulRegistration(email, token.access.token, name)
    return Responses(res, 'Sign-up successful. Please check your email for verification.')
  } catch (error:any) {
    console.error('Error in sign-up controller:', error)
    return Responses(res, 'An error occurred during sign-up.', undefined, error)
  }
}

export const signInController = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return Responses(res, 'No user found with this email.')
    }
    if (!comparePassword(password, user.passwordHash)) {
      return Responses(res, 'Invalid email or password.')
    }
    const token = await generateAuthTokens(user._id, user.role)
    await Token.updateOne(
      { user: user._id },
      {
        access: { token: token.access.token, expireAt: token.access.expires },
        refresh: { token: token.refresh.token, expireAt: token.refresh.expires },
      },
    )
    return Responses(res, 'Sign-in successful.', { user, token })
  } catch (error:any) {
    console.error('Error in sign-in controller:', error)
    return Responses(res, 'An error occurred during sign-in.', undefined, error)
  }
}

export const registerTokenValidate = async (req: Request, res: Response) => {
  try {
    const token = req.query.token as string
    const verifiedToken = verifyToken(token)
    if (verifiedToken.type !== tokenTypes.VERIFY_EMAIL) {
      return Responses(res, 'Invalid token')
    }
    const user = await User.findById(verifiedToken.userId)
    if (!user) {
      return Responses(res, 'User not found')
    }
    user.isEmailVerified = true
    await user.save()
    await Token.deleteOne({ token })
    return Responses(res, 'Email verified successfully')
  } catch (error:any) {
    console.error('Error in token validation controller:', error)
    return Responses(res, 'An error occurred during token validation.', undefined, error)
  }
}

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) {
      return Responses(res, 'User not found')
    }
    const token = await generateForgotVerificationToken(user._id, user.role)
    await Token.create({
      user: user._id,
      type: tokenTypes.RESET_PASSWORD,
      expireAt: token.access.expires,
      token: token.access.token,
    })
    await sendResetPasswordEmail(email, token.access.token)
    return Responses(res, 'Reset password link sent to your email')
  } catch (error:any) {
    console.error('Error in forgot password controller:', error)
    return Responses(res, 'An error occurred during password reset request.', undefined, error)
  }
}

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.query
    const verifiedToken = verifyToken(token as string)
    if (verifiedToken.type !== tokenTypes.RESET_PASSWORD) {
      return Responses(res, 'Invalid token')
    }
    const user = await User.findById(verifiedToken.userId)
    if (!user) {
      return Responses(res, 'User not found')
    }
    user.passwordHash = encryptedPassword(newPassword as string)
    await user.save()
    await Token.deleteOne({ token })
    return Responses(res, 'Password reset successfully')
  } catch (error:any) {
    console.error('Error in password reset controller:', error)
    return Responses(res, 'An error occurred during password reset.', undefined, error)
  }
}
