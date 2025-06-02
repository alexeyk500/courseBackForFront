import { Router } from 'express';
import { createUser } from './user.controller';

const userRouter = Router();

userRouter.post('/users', createUser);

export default userRouter;
