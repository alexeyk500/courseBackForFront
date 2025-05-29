import { Router } from 'express';
import { createUser, getAllUsers } from '../controllers/users.controller';

const userRouter = Router();

userRouter.get('/users', getAllUsers);
userRouter.post('/users', createUser);

export default userRouter;
