import { Request, Response, NextFunction } from 'express';
import UserModel from '../models/user.model';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.body;

  try {
    const newUser = await UserModel.create(user);
    res.status(201).send(newUser);
  } catch (err) {
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
    const user = await UserModel.findById(id).orFail();
    res.send(user);
  } catch (err) {
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
