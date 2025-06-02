import { NextFunction, Request, Response } from 'express';

import Todo from '../models/todo';
import NotFoundError from '../errors/not-found-error';

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const todo = req.body;
  const userId = res.locals.user.id;

  todo.owner = userId;

  try {
    const newTodo = await Todo.create(todo);
    res.status(201).send(newTodo);
  } catch (error) {
    next(error);
  }
};

export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const limit = Number(req.query.limit) || 10;
  const page = Number(req.query.page) || 1;
  const userId = res.locals.user.id;

  try {
    const totalDocs = await Todo.countDocuments({ owner: userId });
    const totalPages = Math.ceil(totalDocs / limit);

    const todos = await Todo.find({ owner: userId })
      .populate('owner')
      .limit(limit)
      .skip((page - 1) * limit);

    res.send({ todos, currentPage: page, totalPages });
  } catch (error) {
    next(error);
  }
};

export const removeTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const todoId = req.params.id;
  const userId = res.locals.user.id;

  try {
    await Todo.deleteOne({ _id: todoId, owner: userId }).orFail(
      () => new NotFoundError('Todo does not exist!'),
    );
    res.send({ message: 'todo deleted' });
  } catch (error) {
    next(error);
  }
};
