import { Router } from 'express';
import { createTodo, getAllTodos } from '../controllers/todo.controller';

const todoRouter = Router();

todoRouter.get('/todos', getAllTodos);
todoRouter.post('/todos', createTodo);

export default todoRouter;
