import { Request, Response, NextFunction } from 'express';
import NotAuthorizedError from '../errors/not-authorized-error';
import jwt from 'jsonwebtoken';

export const fakeHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
    res.header('x-powered-by', 'Ruby on Rails');
    next()
};
