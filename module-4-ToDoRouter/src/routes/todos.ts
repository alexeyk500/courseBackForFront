import { Router } from 'express'
import { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from "../controllers/todos";
import { hasValidId } from "../middlewares/hasValidId";

const todosRouter = Router();

todosRouter.get('/', getAllTodos);

todosRouter.get('/:id', [hasValidId], getTodoById);

todosRouter.post('/', createTodo);

todosRouter.put('/:id', [hasValidId], updateTodo)

todosRouter.delete('/:id', [hasValidId], deleteTodo)

export default todosRouter