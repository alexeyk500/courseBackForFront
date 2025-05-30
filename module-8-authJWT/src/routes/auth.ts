import { Router } from 'express';
import { createUser, logInUser, logOutUser } from '../controllers/auth';

const authRouter = Router();

authRouter.post('/sign-up', createUser);
authRouter.post('/sign-in', logInUser);
authRouter.post('/log-out', logOutUser);

export default authRouter;