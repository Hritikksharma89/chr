import { Request, Response } from 'express'
import { Church } from '../../schema/schema'

// Create a Church

export const create = async (req: Request, res: Response) => {
  try {
    const church = await Church.create(req.body)
    res.status(201).json(church)
    console.log('Church created:', church)
  } catch (error: any) {
    console.error('Error creating Church:', error)
    res.status(400).json({ message: error.message })
  }
}

// Read Church with pagination

export const getAll = async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query
  const options = {
    page: parseInt(page as string, 10),
    limit: parseInt(limit as string, 10),
  }

  try {
    const church = await Church.find({}, null, options)
    res.status(200).json(church)
  } catch (error: any) {
    console.error('Error retrieving Churches:', error)
    res.status(500).json({ message: 'Failed to retrieve Churches.' })
  }
}

export const GetById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const church = await Church.findById(id)
    if (!Church) {
      return res.status(404).json({ message: 'Church not found.' })
    }
    res.status(200).json(church)
  } catch (error: any) {
    console.error('Error getting Church:', error)
    res.status(400).json({ message: error.message })
  }
}

// Update a Church
export const updateChurch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const church = await Church.findByIdAndUpdate(id, req.body, { new: true })
    if (!church) {
      return res.status(404).json({ message: 'Church not found.' })
    }
    res.status(200).json(Church)
  } catch (error: any) {
    console.error('Error updating Church:', error)
    res.status(400).json({ message: error.message })
  }
}

// Delete a Church
export const deleteChurch = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const church = await Church.findByIdAndDelete(id)
    if (!church) {
      return res.status(404).json({ message: 'Church not found.' })
    }
    res.status(204).send()
    console.log('Church deleted:', Church)
  } catch (error: any) {
    console.error('Error deleting Church:', error)
    res.status(400).json({ message: error.message })
  }
}
