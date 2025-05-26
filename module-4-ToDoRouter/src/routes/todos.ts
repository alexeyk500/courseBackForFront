import { Router } from 'express'
import { createTodo, deleteTodo, getAllTodos, getTodoById, updateTodo } from "../controllers/todos";
import { hasValidId } from "../middlewares/hasValidId";
import { validateCreateTodo, validateUpdateTodo } from "../validations/todos";
import { validateUrlId } from "../validations/urlParams";

const todosRouter = Router();

todosRouter.get('/', getAllTodos);

todosRouter.get('/:id', [validateUrlId], getTodoById);

todosRouter.post('/', [validateCreateTodo], createTodo);

todosRouter.put('/:id', [validateUrlId, validateUpdateTodo], updateTodo)

todosRouter.delete('/:id', [hasValidId], deleteTodo)

export default todosRouter