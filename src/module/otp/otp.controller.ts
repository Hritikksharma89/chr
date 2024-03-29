import { Request, Response } from 'express'

import { Otp } from './otp.schema'
import { createOtpDto, updateOtpDto } from './otp.validation'
import { logger } from '../../core/log/log'
import { Responses } from '../../core/common/response'

export const createOtp = async (req: Request, res: Response) => {
  try {
    const otpData = createOtpDto.parse(req.body)
    const otp = await Otp.create(otpData)
    logger.info('OTP created successfully')
    return Responses(res, 'OTP created successfully', otp)
  } catch (error: any) {
    logger.error('Error creating OTP:', error)
    return Responses(res, 'Error creating OTP', {}, error)
  }
}

export const getAllOtps = async (req: Request, res: Response) => {
  try {
    const otps = await Otp.find()
    logger.info('OTPs retrieved successfully')
    return Responses(res, 'OTPs retrieved successfully', otps)
  } catch (error: any) {
    logger.error('Error retrieving OTPs:', error)
    return Responses(res, 'Error retrieving OTPs', [], error)
  }
}

export const getOtpById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const otp = await Otp.findById(id)
    if (!otp) {
      return Responses(res, 'OTP not found', {}, { code: 404 })
    }
    logger.info('OTP retrieved successfully')
    return Responses(res, 'OTP retrieved successfully', otp)
  } catch (error: any) {
    logger.error('Error retrieving OTP:', error)
    return Responses(res, 'Error retrieving OTP', {}, error)
  }
}

export const updateOtp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const otpData = updateOtpDto.parse(req.body)
    const otp = await Otp.findByIdAndUpdate(id, otpData, { new: true })
    if (!otp) {
      return Responses(res, 'OTP not found', {}, { code: 404 })
    }
    logger.info('OTP updated successfully')
    return Responses(res, 'OTP updated successfully', otp)
  } catch (error: any) {
    logger.error('Error updating OTP:', error)
    return Responses(res, 'Error updating OTP', {}, error)
  }
}

export const deleteOtp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const otp = await Otp.findByIdAndDelete(id)
    if (!otp) {
      return Responses(res, 'OTP not found', {}, { code: 404 })
    }
    logger.info('OTP deleted successfully')
    return Responses(res, 'OTP deleted successfully')
  } catch (error: any) {
    logger.error('Error deleting OTP:', error)
    return Responses(res, 'Error deleting OTP', {}, error)
  }
}
