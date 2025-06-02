import { Router } from 'express';
import {
  createShortLink,
  deleteShortLink,
  getAllShortLinksByUser,
  updateShortLink,
} from './shortner.controller';

const shortnerRouter = Router();

shortnerRouter.post('/shortner', createShortLink);
shortnerRouter.get('/shortner', getAllShortLinksByUser);
shortnerRouter.patch('/shortner/:id', updateShortLink);
shortnerRouter.delete('/shortner/:id', deleteShortLink);

export default shortnerRouter;
