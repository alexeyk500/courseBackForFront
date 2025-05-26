import { Router } from 'express'
import { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from "../controllers/todos";

const todosRouter = Router();

todosRouter.get('/', getAllTodos);

todosRouter.get('/:id', getTodoById);

todosRouter.post('/', createTodo);

todosRouter.put('/:id', updateTodo)

todosRouter.delete('/:id', deleteTodo)

export default todosRouter