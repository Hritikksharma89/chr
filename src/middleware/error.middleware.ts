// import { Request, Response, NextFunction } from 'express'

// export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
//   console.error(error.stack)
//   res.status(500).json({ message: 'Internal server error.' })
// }

import { Request, Response, NextFunction } from 'express';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(error.stack);
  res.status(500).json({ message: 'Internal server error.' });
  next(error); // Call next to pass the error to the next error-handling middleware
};
