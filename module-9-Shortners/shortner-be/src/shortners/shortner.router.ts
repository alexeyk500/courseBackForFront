import { Router } from 'express';
import { createShortLink } from './shortner.controller';

const shortnerRouter = Router();

shortnerRouter.post('/shortner', createShortLink);

export default shortnerRouter;
