import { Router } from 'express';
import { createUser, loginUser, logoutUser } from './user.controller';

const userRouter = Router();

userRouter.post('/users', createUser);
userRouter.post('/users/login', loginUser);
userRouter.post('/users/logout', logoutUser);

export default userRouter;
