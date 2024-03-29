import { Request, Response } from 'express'

import { Event } from './event.schema'
import { createEventDto, updateEventDto } from './event.validation'
import { logger } from '../../core/log/log'
import { Responses } from '../../core/common/response'

export const createEvent = async (req: Request, res: Response) => {
  try {
    const eventData = createEventDto.parse(req.body)
    const event = await Event.create(eventData)
    logger.info('Event created successfully')
    return Responses(res, 'Event created successfully', event)
  } catch (error: any) {
    logger.error('Error creating event:', error)
    return Responses(res, 'Error creating event', {}, error)
  }
}

export const getAllEvents = async (req: Request, res: Response) => {
  try {
    const events = await Event.find()
    logger.info('Events retrieved successfully')
    return Responses(res, 'Events retrieved successfully', events)
  } catch (error: any) {
    logger.error('Error retrieving events:', error)
    return Responses(res, 'Error retrieving events', [], error)
  }
}

export const getEventById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const event = await Event.findById(id)
    if (!event) {
      return Responses(res, 'Event not found', {}, { code: 404 })
    }
    logger.info('Event retrieved successfully')
    return Responses(res, 'Event retrieved successfully', event)
  } catch (error: any) {
    logger.error('Error retrieving event:', error)
    return Responses(res, 'Error retrieving event', {}, error)
  }
}

export const updateEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const eventData = updateEventDto.parse(req.body)
    const event = await Event.findByIdAndUpdate(id, eventData, { new: true })
    if (!event) {
      return Responses(res, 'Event not found', {}, { code: 404 })
    }
    logger.info('Event updated successfully')
    return Responses(res, 'Event updated successfully', event)
  } catch (error: any) {
    logger.error('Error updating event:', error)
    return Responses(res, 'Error updating event', {}, error)
  }
}

export const deleteEvent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const event = await Event.findByIdAndDelete(id)
    if (!event) {
      return Responses(res, 'Event not found', {}, { code: 404 })
    }
    logger.info('Event deleted successfully')
    return Responses(res, 'Event deleted successfully')
  } catch (error: any) {
    logger.error('Error deleting event:', error)
    return Responses(res, 'Error deleting event', {}, error)
  }
}
