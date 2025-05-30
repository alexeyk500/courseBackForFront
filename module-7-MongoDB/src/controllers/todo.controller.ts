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
    const limit = Number(req.query.limit) || 10;
    const currentPage = Number(req.query.page) || 1;
    const skip = (currentPage - 1) * limit;

    const total = await TodoModel.countDocuments();
    const totalPages = Math.ceil(total / limit);

    const todos = await TodoModel.find()
      .limit(limit)
      .skip(skip)
      .orFail()
      .sort({ 'category.title': 1 })
      .populate('owner');
    res.send({ todos, limit, currentPage, totalPages });
  } catch (err) {
    next(err);
  }
};
