import { Request, Response, NextFunction } from 'express';
import UserModel from './user.model';
import { Error as MongooseError } from 'mongoose';
import { transformError } from '../helpers/transform-error';
import BadRequestError from '../errors/bad-request-error';
import { ERROR_CODES } from '../constants/errorCodes';
import Conflict from '../errors/conflict-error';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;
  try {
    const newUser = await UserModel.create({ email, password });
    res.status(201).json({ id: newUser.id });
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) {
      const errors = transformError(err);
      next(new BadRequestError(errors[0].message));
      return;
    }
    if ((err as Error).message.startsWith(ERROR_CODES.unique)) {
      next(new Conflict('user email is not unique'));
      return;
    }
    next(err);
  }
};
