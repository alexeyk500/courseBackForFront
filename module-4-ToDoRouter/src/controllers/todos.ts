import { Request, Response } from 'express';
import { NotFoundError } from "../errors/NotFoundError";

const todos = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Learn Express", completed: false },
  { id: 3, title: "Learn MongoDB", completed: false },
];

export const getAllTodos = (req: Request, res: Response) => {
  res.json(todos);
}

export const getTodoById = (req: Request, res: Response) => {
  const id = +req.params.id;

  const todo = todos.find(todo => todo.id === id);

  if (!todo) throw new NotFoundError('Todo not found');

  res.json(todo);
}

export const createTodo = (req: Request, res: Response) => {
  const newTodo = req.body;

  newTodo.id = (todos.at(-1)?.id || 0) + 1;

  todos.push(newTodo);

  res.status(201).json(newTodo);
}

export const updateTodo = (req: Request, res: Response) => {
  const id = +req.params.id;
  const updatedTodo = req.body;

  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex < 0) throw new NotFoundError('Todo not found');

  todos[todoIndex] = updatedTodo;

  res.json(updatedTodo);
}

export const deleteTodo = (req: Request, res: Response) => {
  const id = +req.params.id;

  const todoIndex = todos.findIndex(todo => todo.id === id);

  if (todoIndex < 0) throw new NotFoundError('Todo not found');

  todos.splice(todoIndex, 1);

  res.status(200).send();
}