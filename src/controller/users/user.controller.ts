import { Request, Response } from 'express'
import { User } from '../../schema/schema'

// Create a user

export const create = async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
    console.log('User created:', user)
  } catch (error: any) {
    console.error('Error creating user:', error)
    res.status(400).json({ message: error.message })
  }
}

// Read users with pagination

export const getAll = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query
  const options = {
    page: parseInt(page as string, 10),
    limit: parseInt(limit as string, 10),
  }

  try {
    const users = await User.find({}, null, options)
    res.status(200).json(users)
  } catch (error: any) {
    console.error('Error retrieving users:', error)
    res.status(500).json({ message: 'Failed to retrieve users.' })
  }
}

export const GetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findById(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }
    res.status(200).json(user)
  } catch (error: any) {
    console.error('Error getting user:', error)
    res.status(400).json({ message: error.message })
  }
}

// Update a user
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, req.body, { new: true })
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }
    res.status(200).json(user)
  } catch (error: any) {
    console.error('Error updating user:', error)
    res.status(400).json({ message: error.message })
  }
}

// Delete a user
export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }
    res.status(204).send()
    console.log('User deleted:', user)
  } catch (error: any) {
    console.error('Error deleting user:', error)
    res.status(400).json({ message: error.message })
  }
}
