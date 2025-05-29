import { Request, Response, NextFunction } from 'express';
import UserModel, { IUser, IUserModel } from '../models/user.model';
import { Error as MongooseError } from 'mongoose';
import { errorTransform } from '../utils/errorTransform';
import { BadRequestError } from '../errors/BadRequestError';
import { ConflictError } from '../errors/ConflictError';
import { NotFoundError } from '../errors/NotFoundError';
import { CastError } from '../errors/CastError';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.body;

  try {
    const newUser = (await UserModel.create(user)) as IUser;
    const token = newUser.generateToken();
    console.log('token', token);
    const resultFindByCredentials = await (
      UserModel as IUserModel
    ).findByCredentials(newUser.email, newUser.password);
    console.log('resultFindByCredentials', resultFindByCredentials);
    res.status(201).send(newUser);
  } catch (err) {
    if (err instanceof MongooseError.ValidationError) {
      const errors = errorTransform(err);
      next(new BadRequestError(errors[0].message));
      return;
    }

    if ((err as Error).message.includes('E11000')) {
      next(new ConflictError('Email should be unique'));
      return;
    }

    next(err);
  }
};

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allUsers = await UserModel.find();
    res.send(allUsers);
  } catch (err) {
    next(err);
  }
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const user = await UserModel.findById(id).orFail(
      () => new NotFoundError('User does not exist'),
    );
    res.send(user);
  } catch (err) {
    if (err instanceof MongooseError.CastError) {
      next(new CastError('Wrong format for user id'));
      return;
    }
    next(err);
  }
};

export const patchUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    const user = req.body;
    const newUser = await UserModel.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    }).orFail();
    res.send(newUser);
  } catch (err) {
    next(err);
  }
};

export const deleteUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const id = req.params.id;
    await UserModel.findByIdAndDelete(id).orFail();
    res.send({ id });
  } catch (err) {
    next(err);
  }
};
