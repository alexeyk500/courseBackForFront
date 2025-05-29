import { Request, Response, NextFunction } from 'express';
import { CustomError } from '../errors/CustomError';

const errorHendler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  if (err instanceof CustomError) {
    res.status(err.statusCode).json({ message: err.message });
    return;
  }
  res.status(500).send(err);
};

export default errorHendler;
