import express, { Request, Response } from 'express'
import { User } from '../schema/schema'

const userRoute = express.Router()

// Create
userRoute.post('/users', async (req: Request, res: Response) => {
  try {
    const user = await User.create(req.body)
    res.status(201).json(user)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
})

// Read (with pagination)
userRoute.get('/users', async (req: Request, res: Response) => {
  const { page = 1, limit = 10 } = req.query
  const options = {
    page: parseInt(page as string, 10),
    limit: parseInt(limit as string, 10),
  }

  try {
    const users = await User.find(options)
    res.status(200).json(users)
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to retrieve users.' })
  }
})

// Update
userRoute.patch('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndUpdate(id, req.body, { new: true })
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }
    res.status(200).json(user)
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
})

// Delete
userRoute.delete('/users/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const user = await User.findByIdAndDelete(id)
    if (!user) {
      return res.status(404).json({ message: 'User not found.' })
    }
    res.status(204).send()
  } catch (error: any) {
    res.status(400).json({ message: error.message })
  }
})

export default userRoute
