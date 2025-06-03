import { NextFunction, Request, Response } from 'express';
import { Error as MongooseError } from 'mongoose';

import { ErrorCodes } from '../constants/error-codes';
import BadRequestError from '../errors/bad-request-error';
import Conflict from '../errors/conflict-error';
import { transformError } from '../helpers/transform-error';
import User from './user.model';

const ONE_HOUR = 3600000;

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body;

  try {
    const newUser = await User.create(user);

    const token = newUser.generateAccessToken();

    res
      .status(201)
      .cookie('accessToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: ONE_HOUR,
      })
      .send({ id: newUser._id });
  } catch (error) {
    if (error instanceof MongooseError.ValidationError) {
      const errors = transformError(error);

      return next(new BadRequestError(errors[0].message));
    }

    if ((error as Error).message.startsWith(ErrorCodes.unique)) {
      return next(new Conflict('User with this email already exists'));
    }

    next(error);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    const user = await User.findUserByCredentials(email, password);
    const accessToken = user.generateAccessToken();

    res
      .status(201)
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: ONE_HOUR,
      })
      .send({});
  } catch (error) {
    next(error);
  }
};

export const logOutUser = async (req: Request, res: Response) => {
  res
    .clearCookie('accessToken', {
      httpOnly: true,
    })
    .json({});
};
