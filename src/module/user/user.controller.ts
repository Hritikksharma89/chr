import { Request, Response } from 'express'

import { User } from './user.schema'
import { createUserDto, updateUserDto } from './user.validation'
import { logger } from '../../core/log/log'
import { Responses } from '../../core/common/response'

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData = createUserDto.parse(req.body)
    const user = await User.create(userData)
    logger.info('User created successfully')
    return Responses(res, 'User created successfully', user)
  } catch (error: any) {
    logger.error('Error creating user:', error)
    return Responses(res, 'Error creating user', {}, error)
  }
}

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1
    const limit = parseInt(req.query.limit as string) || 10
    const skip = (page - 1) * limit

    const users = await User.find().skip(skip).limit(limit)
    const totalUsers = await User.countDocuments()

    const totalPages = Math.ceil(totalUsers / limit)
    const hasNextPage = page < totalPages

    logger.info('Users retrieved successfully')
    return Responses(res, 'Users retrieved successfully', { users, totalPages, hasNextPage })
  } catch (error: any) {
    logger.error('Error retrieving users:', error)
    return Responses(res, 'Error retrieving users', [], error)
  }
}

export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return Responses(res, 'User not found', {}, { code: 404 })
    }
    logger.info('User retrieved successfully')
    return Responses(res, 'User retrieved successfully', user)
  } catch (error: any) {
    logger.error('Error retrieving user:', error)
    return Responses(res, 'Error retrieving user', {}, error)
  }
}

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const userData = updateUserDto.parse(req.body)
    const user = await User.findByIdAndUpdate(id, userData, { new: true })
    if (!user) {
      return Responses(res, 'User not found', {}, { code: 404 })
    }
    logger.info('User updated successfully')
    return Responses(res, 'User updated successfully', user)
  } catch (error: any) {
    logger.error('Error updating user:', error)
    return Responses(res, 'Error updating user', {}, error)
  }
}

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return Responses(res, 'User not found', {}, { code: 404 })
    }
    logger.info('User deleted successfully')
    return Responses(res, 'User deleted successfully')
  } catch (error: any) {
    logger.error('Error deleting user:', error)
    return Responses(res, 'Error deleting user', {}, error)
  }
}
