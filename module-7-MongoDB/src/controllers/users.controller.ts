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
