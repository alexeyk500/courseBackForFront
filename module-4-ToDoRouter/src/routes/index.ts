import { Request, Response, Router } from 'express';
import todosRouter from "./todos";

const appRouter = Router();

appRouter.use('/todos', todosRouter);

appRouter.all('*path', (req: Request, res: Response) => {
  res.status(404).json({ message: 'not found' });
});

export default appRouter;