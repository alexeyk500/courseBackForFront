import { NextFunction, Request, Response } from 'express';
import User, { IUser } from '../models/user';
import { Error as MongooseError } from 'mongoose';
import { transformError } from '../helpers/transform-error';
import BadRequestError from '../errors/bad-request-error';
import ConflictError from '../errors/conflict-error';

const ONE_HOUR_IN_MS = 60*60*1000;
const NODE_ENV = process.env.NODE_ENV;

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.body;

  try {
    const newUser = await User.create(user);
    const token = (newUser as IUser).generateToken();

    res.status(201)
      .cookie('accessToken', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production',
        maxAge: ONE_HOUR_IN_MS
      })
      .send(newUser);
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      const errors = transformError(error);
      next(new BadRequestError(errors[0].message));
      return;
    }

    if ((error as Error).message.startsWith('E11000')) {
      next(new ConflictError('Email should be unique'));
      return;
    }

    next(error);
  }
};

export const logInUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = (user as unknown as IUser).generateToken();

    res.status(201)
      .cookie('accessToken', token, {
        httpOnly: true,
        secure: NODE_ENV === 'production',
        sameSite: NODE_ENV === 'production',
        maxAge: ONE_HOUR_IN_MS
      })
      .send(user);

  } catch (err) {
    next(err)
  }
}

export const logOutUser = async (
  req: Request,
  res: Response,
  next: NextFunction, // eslint-disable-line @typescript-eslint/no-unused-vars
) => {
  res.clearCookie('accessToken', {httpOnly: true}).send({message: 'success'})
}