import { Request, Response } from 'express'

import { Church } from './church.schema'
import { createChurchDto, updateChurchDto } from './church.validation'
import { logger } from '../../core/log/log'
import { Responses } from '../../core/common/response'

export const createChurch = async (req: Request, res: Response) => {
  try {
    const churchData = createChurchDto.parse(req.body)
    const church = await Church.create(churchData)
    logger.info('Church created successfully')
    return Responses(res, 'Church created successfully', church)
  } catch (error: any) {
    logger.error('Error creating church:', error)
    return Responses(res, 'Error creating church', {}, error)
  }
}

export const getAllChurches = async (req: Request, res: Response) => {
  try {
    const churches = await Church.find()
    logger.info('Churches retrieved successfully')
    return Responses(res, 'Churches retrieved successfully', churches)
  } catch (error: any) {
    logger.error('Error retrieving churches:', error)
    return Responses(res, 'Error retrieving churches', [], error)
  }
}

export const getChurchById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const church = await Church.findById(id)
    if (!church) {
      return Responses(res, 'Church not found', {}, { code: 404 })
    }
    logger.info('Church retrieved successfully')
    return Responses(res, 'Church retrieved successfully', church)
  } catch (error: any) {
    logger.error('Error retrieving church:', error)
    return Responses(res, 'Error retrieving church', {}, error)
  }
}

export const updateChurch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const churchData = updateChurchDto.parse(req.body)
    const church = await Church.findByIdAndUpdate(id, churchData, { new: true })
    if (!church) {
      return Responses(res, 'Church not found', {}, { code: 404 })
    }
    logger.info('Church updated successfully')
    return Responses(res, 'Church updated successfully', church)
  } catch (error: any) {
    logger.error('Error updating church:', error)
    return Responses(res, 'Error updating church', {}, error)
  }
}

export const deleteChurch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const church = await Church.findByIdAndDelete(id)
    if (!church) {
      return Responses(res, 'Church not found', {}, { code: 404 })
    }
    logger.info('Church deleted successfully')
    return Responses(res, 'Church deleted successfully')
  } catch (error: any) {
    logger.error('Error deleting church:', error)
    return Responses(res, 'Error deleting church', {}, error)
  }
}
