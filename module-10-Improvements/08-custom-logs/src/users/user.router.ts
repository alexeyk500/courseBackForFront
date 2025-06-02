import { Router } from 'express';
import { createUser, loginUser, logOutUser } from './user.controller';

const router = Router();

router.post('/users', createUser);
router.post('/users/login', loginUser);
router.post('/users/logout', logOutUser);

export default router;
