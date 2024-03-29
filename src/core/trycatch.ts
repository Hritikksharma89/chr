import { NextFunction, Request, Response } from 'express';
import { JsonWebTokenError } from 'jsonwebtoken';
import { ZodError } from 'zod';

class BSONError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BSONError';
  }
}

const tryCatch = (fn: any) => async (req: Request, res: Response, next: NextFunction) => {
  try {
    await fn(req, res);
    return next();
  } catch (error: any) {
    if (error instanceof ZodError) {
      return res.json({ error: error.errors, message: 'Validation Error' });
    }
    if (error instanceof BSONError) {
      return res.json({ message: 'Database error', error: error.message });
    }
    if (error instanceof JsonWebTokenError) {
      return res.json({ message: 'Your token is invalid try login again', error: error.message });
    }

    return res.send({ message: 'Something went wrong', error });
  }
};

export default tryCatch;
