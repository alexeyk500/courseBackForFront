import { Request, Response, NextFunction } from 'express';
import TodoModel from '../models/todo.model';

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const todo = req.body;
  todo.owner = '683826318f94a7763983a0f5';

  try {
    const newTodo = await TodoModel.create(todo);
    res.status(201).send(newTodo);
  } catch (err) {
    next(err);
  }
};

export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const allTodos = await TodoModel.find().orFail().populate('owner');
    res.send(allTodos);
  } catch (err) {
    next(err);
  }
};
