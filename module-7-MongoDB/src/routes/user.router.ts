import { Router } from 'express';
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  patchUserById,
} from '../controllers/users.controller';

const userRouter = Router();

userRouter.get('/users', getAllUsers);
userRouter.post('/users', createUser);
userRouter.get('/users/:id', getUserById);
userRouter.patch('/users/:id', patchUserById);
userRouter.delete('/users/:id', deleteUserById);

export default userRouter;
